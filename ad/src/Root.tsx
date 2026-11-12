import { Composition } from "remotion";
import { AirFryerAd } from "./AirFryerAd";
import timeline from "./timeline.json";

export const RemotionRoot = () => (
  <Composition
    id="AirFryerAd"
    component={AirFryerAd}
    durationInFrames={timeline.durationInFrames}
    fps={timeline.fps}
    width={1080}
    height={1920}
  />
);
