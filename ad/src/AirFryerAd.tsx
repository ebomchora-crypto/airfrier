import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Bonus, Hook, Price, Problem, Reveal, Value } from "./scenes";
import { WipeIn } from "./components";
import { Captions } from "./Captions";
import { C, loadFonts } from "./theme";

loadFonts();

// Scene boundaries (frames @30fps), synced to the voiceover in src/timeline.json
const S = { hook: 0, problem: 90, reveal: 198, value: 282, bonus: 498, price: 606, end: 900 };
const OVERLAP = 10; // each scene keeps playing under the next scene's wipe

export const AirFryerAd = () => (
  <AbsoluteFill style={{ background: C.espresso }}>
    <Sequence from={S.hook} durationInFrames={S.problem - S.hook + OVERLAP}><Hook /></Sequence>
    <Sequence from={S.problem} durationInFrames={S.reveal - S.problem + OVERLAP}><WipeIn><Problem /></WipeIn></Sequence>
    <Sequence from={S.reveal} durationInFrames={S.value - S.reveal + OVERLAP}><WipeIn><Reveal /></WipeIn></Sequence>
    <Sequence from={S.value} durationInFrames={S.bonus - S.value + OVERLAP}><WipeIn><Value start={S.value} /></WipeIn></Sequence>
    <Sequence from={S.bonus} durationInFrames={S.price - S.bonus + OVERLAP}><WipeIn><Bonus start={S.bonus} /></WipeIn></Sequence>
    <Sequence from={S.price} durationInFrames={S.end - S.price}><WipeIn><Price start={S.price} /></WipeIn></Sequence>
    <Captions />
    <Audio src={staticFile("audio/mix.wav")} />
  </AbsoluteFill>
);
