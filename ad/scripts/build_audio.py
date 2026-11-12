"""Builds the timed voiceover, SFX, final mix, caption timeline and SRT.

Inputs : public/audio/vo-raw.mp3 (TTS), public/audio/music.mp3, scripts/vo-words-raw.json (ASR word times)
Outputs: public/audio/vo.wav, public/audio/sfx.wav, public/audio/mix.wav,
         src/timeline.json, out/air-fryer-meals-for-two-ad.srt
"""
import json, subprocess, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = lambda p: os.path.join(ROOT, p)
FPS, DUR = 30, 30.0
TEMPO = 0.94  # slightly slower, pitch preserved (atempo)

# Sentence cuts in the raw TTS (cut points sit inside measured silences) and where each lands on the ad timeline.
SEGMENTS = [  # raw_start, raw_end, place_at
    (0.00, 1.75, 0.25),   # Still wondering what to make for dinner?
    (1.75, 4.30, 3.10),   # Cooking for two doesn't have to be complicated.
    (4.30, 6.08, 6.80),   # With Air Fryer Meals for Two,
    (6.08, 12.93, 9.00),  # you'll get thirty easy, delicious recipes, four weekly meal plans, and grocery lists ...
    (12.93, 15.78, 16.80),# Plus, ten bonus quick dinner ideas!
    (15.78, 19.08, 20.20),# And the entire digital cookbook is just eight dollars.
    (19.08, 21.09, 24.20),# Tap below and get your copy today!
]

def run(args):
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", *args], check=True)

# ---------- voiceover ----------
filters, labels = [], []
for i, (s, e, at) in enumerate(SEGMENTS):
    filters.append(f"[0:a]atrim={s}:{e},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={e-s-0.03:.3f}:d=0.03,"
                   f"atempo={TEMPO},adelay={int(at*1000)}|{int(at*1000)}[v{i}]")
    labels.append(f"[v{i}]")
filters.append("".join(labels) + f"amix=inputs={len(labels)}:normalize=0,apad,atrim=0:{DUR},"
               "highpass=f=80,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,loudnorm=I=-16:TP=-2:LRA=7,"
               "aresample=48000,aformat=channel_layouts=stereo[vo]")
run(["-i", A("public/audio/vo-raw.mp3"), "-filter_complex", ";".join(filters), "-map", "[vo]", A("public/audio/vo.wav")])

# ---------- word timeline (ASR timings remapped; text from the approved script) ----------
SCRIPT = ("Still wondering what to make for dinner? Cooking for two doesn't have to be complicated. "
          "With Air Fryer Meals for Two, you'll get thirty easy, delicious recipes, four weekly meal plans, "
          "and grocery lists to make dinner planning simpler. Plus, ten bonus quick dinner ideas! "
          "And the entire digital cookbook is just eight dollars. Tap below and get your copy today!").split()
raw = json.load(open(A("scripts/vo-words-raw.json")))
# ASR merged/rewrote a few tokens: "Airfire"->"Air Fryer", "$8."->"eight dollars." Re-align by expanding.
asr = []
for w in raw:
    if w["w"].lower().startswith("airfire"):
        mid = (w["s"] + w["e"]) / 2
        asr += [{"s": w["s"], "e": mid}, {"s": mid, "e": w["e"]}]
    elif w["w"].startswith("$"):
        mid = (w["s"] + w["e"]) / 2
        asr += [{"s": w["s"], "e": mid}, {"s": mid, "e": w["e"]}]
    else:
        asr.append({"s": w["s"], "e": w["e"]})
assert len(asr) == len(SCRIPT), (len(asr), len(SCRIPT))

def remap(t, mid):
    """Map a raw time to the ad timeline, choosing the sentence by the word's midpoint."""
    for s, e, at in SEGMENTS:
        if s <= mid < e:
            return at + (min(max(t, s), e) - s) / TEMPO
    raise ValueError(t)

words = []
for i, a in enumerate(asr):
    mid = (a["s"] + a["e"]) / 2
    words.append({"text": SCRIPT[i], "start": round(remap(a["s"], mid), 3), "end": round(remap(a["e"], mid), 3)})

# Caption chunks (3–5 words), with highlighted words
CHUNKS = [
    (0, 3), (3, 7),                        # Still wondering what | to make for dinner?
    (7, 10), (10, 15),                     # Cooking for two | doesn't have to be complicated.
    (15, 21),                              # With Air Fryer Meals for Two,
    (21, 25), (25, 26),                    # you'll get thirty easy, | delicious recipes,
    (26, 30), (30, 33),                    # four weekly meal plans, | and grocery lists
    (33, 38),                              # to make dinner planning simpler.
    (38, 41), (41, 44),                    # Plus, ten bonus | quick dinner ideas!
    (44, 48), (48, 53),                    # And the entire digital | cookbook is just eight dollars.
    (53, 56), (56, 60),                    # Tap below and | get your copy today!
]
# fix chunk 6: "delicious recipes," is two words
CHUNKS[6] = (25, 27); CHUNKS[7] = (27, 31); CHUNKS[8] = (31, 34); CHUNKS[9] = (34, 39)
CHUNKS[10] = (39, 42); CHUNKS[11] = (42, 45); CHUNKS[12] = (45, 49); CHUNKS[13] = (49, 54)
CHUNKS[14] = (54, 57); CHUNKS[15] = (57, 61)
assert CHUNKS[-1][1] == len(words), (CHUNKS[-1], len(words))
HIGHLIGHT = {"thirty", "easy,", "delicious", "four", "weekly", "grocery", "lists", "ten", "bonus", "eight", "dollars.", "Air", "Fryer", "Meals", "Two,", "today!"}
captions = []
for a, b in CHUNKS:
    ws = words[a:b]
    captions.append({"start": ws[0]["start"], "end": ws[-1]["end"],
                     "words": [{**w, "hl": w["text"] in HIGHLIGHT} for w in ws]})
# hold each caption until the next one starts (max +0.6s) so it never flickers
for i, c in enumerate(captions):
    nxt = captions[i + 1]["start"] if i + 1 < len(captions) else DUR
    c["end"] = round(min(nxt, c["end"] + 0.6), 3)

def t_of(word):  # first occurrence
    return next(w["start"] for w in words if w["text"].lower().startswith(word))
keys = {
    "thirty": t_of("thirty"), "four": t_of("four"), "grocery": t_of("grocery"),
    "ten": t_of("ten"), "eight": t_of("eight"), "tap": t_of("tap"), "withAFM": t_of("with"),
}
timeline = {"fps": FPS, "durationInFrames": int(DUR * FPS), "words": words, "captions": captions,
            "keys": {k: round(v * FPS) for k, v in keys.items()}}
json.dump(timeline, open(A("src/timeline.json"), "w"), indent=1)

# SRT
os.makedirs(A("out"), exist_ok=True)
def ts(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
with open(A("out/air-fryer-meals-for-two-ad.srt"), "w") as f:
    for i, c in enumerate(captions, 1):
        f.write(f"{i}\n{ts(c['start'])} --> {ts(c['end'])}\n{' '.join(w['text'] for w in c['words'])}\n\n")

# ---------- SFX (synthesised with FFmpeg — no third-party licensing) ----------
sfx_dir = A("public/audio/sfx"); os.makedirs(sfx_dir, exist_ok=True)
def gen(name, src, af, d):
    run(["-f", "lavfi", "-i", src, "-t", str(d), "-af", af + ",aresample=48000,aformat=channel_layouts=stereo", f"{sfx_dir}/{name}.wav"])
gen("whoosh", "anoisesrc=c=pink:a=0.6:d=0.6",
    "bandpass=f=900:w=1.2,highpass=f=250,lowpass=f=6000,afade=t=in:d=0.28:curve=exp,afade=t=out:st=0.3:d=0.3:curve=log,volume=1.6", 0.6)
gen("pop", "sine=f=660:d=0.18", "asetrate=48000*1.0,afade=t=out:d=0.16:curve=exp,highpass=f=300,volume=0.6", 0.18)
gen("ding", "sine=f=1318.5:d=1.4", "afade=t=out:d=1.4:curve=exp,volume=0.5", 1.4)
gen("ding2", "sine=f=1975.5:d=1.2", "afade=t=out:d=1.2:curve=exp,volume=0.25", 1.2)
gen("sizzle", "anoisesrc=c=white:a=0.25:d=3.2",
    "highpass=f=2500,lowpass=f=9000,tremolo=f=13:d=0.6,afade=t=in:d=0.4,afade=t=out:st=2.4:d=0.8,volume=0.5", 3.2)
gen("click", "sine=f=1200:d=0.05", "afade=t=out:d=0.05,volume=0.5", 0.05)

events = [("whoosh", 0.00, 0.5), ("sizzle", 0.10, 0.35), ("whoosh", 2.85, 0.7), ("whoosh", 6.45, 0.7),
          ("pop", keys["thirty"], 0.9), ("pop", keys["four"], 0.9), ("pop", keys["grocery"], 0.9),
          ("whoosh", 16.45, 0.7), ("ding2", keys["ten"], 0.8), ("whoosh", 20.05, 0.7),
          ("ding", keys["eight"] + 0.05, 0.9), ("ding2", keys["eight"] + 0.05, 0.9), ("click", keys["tap"], 0.9)]
ins, fl = [], []
for i, (n, t, v) in enumerate(events):
    ins += ["-i", f"{sfx_dir}/{n}.wav"]
    fl.append(f"[{i}:a]volume={v},adelay={int(t*1000)}|{int(t*1000)}[s{i}]")
fl.append("".join(f"[s{i}]" for i in range(len(events))) + f"amix=inputs={len(events)}:normalize=0,apad,atrim=0:{DUR}[sfx]")
run([*ins, "-filter_complex", ";".join(fl), "-map", "[sfx]", A("public/audio/sfx.wav")])

# ---------- final mix: VO on top, music ducked under VO, SFX, mastered for social (-14 LUFS, -1 dBTP) ----------
run(["-i", A("public/audio/vo.wav"), "-i", A("public/audio/music.mp3"), "-i", A("public/audio/sfx.wav"), "-filter_complex",
     f"[1:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{DUR},volume=0.55,afade=t=in:d=0.4,afade=t=out:st={DUR-1.4}:d=1.4[mus];"
     "[0:a]asplit=2[vo][key];"
     "[mus][key]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=350:makeup=1[duck];"
     "[2:a]volume=0.8[fx];"
     f"[vo][duck][fx]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000,atrim=0:{DUR}[mix]",
     "-map", "[mix]", A("public/audio/mix.wav")])
print("keys (frames):", timeline["keys"])
print("captions:", len(captions))
