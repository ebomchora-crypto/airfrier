# Air Fryer Meals for Two — 30s vertical video ad (Remotion)

**Final render:** `out/air-fryer-meals-for-two-ad.mp4` — 1080×1920, 30 fps, 30.0 s, H.264 + AAC, -14 LUFS.
**Captions:** `out/air-fryer-meals-for-two-ad.srt` (also burned into the video).
**Voiceover:** `public/audio/vo.wav` (timed) · `public/audio/vo-raw.mp3` (raw TTS).
**Credits & licensing:** `CREDITS.md`, `footage/sources.csv`.

## Timeline (synced to the voiceover)
| Time | Scene | Footage |
|---|---|---|
| 0:00–0:03 | Hook — "STUCK ON DINNER AGAIN?" | fries close-up |
| 0:03–0:06.6 | Problem — "COOKING FOR TWO?" / "KEEP IT SIMPLE." | couple cooking, zucchini |
| 0:06.6–0:09.4 | Product reveal — real cover in 3D + "30 EASY AIR FRYER RECIPES" | sizzling pan (split screen) |
| 0:09.4–0:16.6 | Value — 3 cards on "thirty / four / grocery" | chicken, fries, salmon, vegetables |
| 0:16.6–0:20.2 | Bonus — gold "+10 BONUS QUICK DINNERS" | roasted cauliflower |
| 0:20.2–0:30 | Price + CTA — "$8", "GET YOUR COPY TODAY" (static from 0:28.3) | plating, in rounded frame |

## Render instructions
```bash
cd ad
npm install
# 1) (optional) re-cut the shots from footage/raw
./scripts_prep.sh
# 2) (optional) rebuild VO timing, SFX, mix, captions and SRT
python3 scripts/build_audio.py
# 3) preview / edit
npx remotion studio src/index.ts
# 4) render
npx remotion render src/index.ts AirFryerAd out/air-fryer-meals-for-two-ad.mp4
```
If Remotion can't download its own Chrome, add `--browser-executable=/path/to/chrome-headless-shell`.

### Swapping the voiceover
Replace `public/audio/vo-raw.mp3`, re-transcribe word timings into `scripts/vo-words-raw.json`
(format: `[{"w","s","e"}]`, e.g. with faster-whisper), adjust `SEGMENTS` cut points in `scripts/build_audio.py`,
then run steps 2 and 4. Scenes and captions follow `src/timeline.json` automatically.

## Editing
- Scenes: `src/scenes.tsx` · Captions: `src/Captions.tsx` · Shared pieces: `src/components.tsx` · Colors/fonts: `src/theme.ts`
- Scene boundaries: `S` in `src/AirFryerAd.tsx`.
