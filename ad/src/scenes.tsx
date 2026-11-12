import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, DISPLAY, SANS } from "./theme";
import { Cover, Footage, Pill, RiseLine, Scrim, WipeIn, headline, serif } from "./components";
import timeline from "./timeline.json";

const K = timeline.keys;

/* 0:00–0:03 HOOK ----------------------------------------------------------- */
export const Hook = () => (
  <AbsoluteFill>
    <Footage src="c01_fries" dur={100} from={1.18} to={1.0} />
    <Scrim top={0.7} bottom={0.35} />
    <div style={{ position: "absolute", left: 72, top: 300, right: 150 }}>
      <RiseLine delay={3}>
        <div style={{ ...headline, fontSize: 150 }}>STUCK ON</div>
      </RiseLine>
      <RiseLine delay={14}>
        <div style={{ ...headline, fontSize: 150, color: C.gold }}>DINNER</div>
      </RiseLine>
      <RiseLine delay={18}>
        <div style={{ ...headline, fontSize: 150, color: C.gold }}>AGAIN?</div>
      </RiseLine>
    </div>
  </AbsoluteFill>
);

/* 0:03–0:07 PROBLEM -------------------------------------------------------- */
export const Problem = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={64}>
      <Footage src="c02_couple" dur={64} from={1.0} to={1.1} />
      <Scrim top={0.6} bottom={0.3} />
      <div style={{ position: "absolute", left: 72, top: 310, right: 150 }}>
        <RiseLine delay={6}><div style={{ ...headline, fontSize: 120 }}>COOKING</div></RiseLine>
        <RiseLine delay={11}><div style={{ ...headline, fontSize: 120 }}>FOR TWO?</div></RiseLine>
      </div>
    </Sequence>
    <Sequence from={54} durationInFrames={70}>
      <WipeIn frames={10}>
        <Footage src="c03_zucchini" dur={70} from={1.12} to={1.0} origin="58% 55%" />
        <Scrim top={0.6} bottom={0.3} />
        <div style={{ position: "absolute", left: 72, top: 320, right: 150 }}>
          <RiseLine delay={8}><div style={{ ...headline, fontSize: 120 }}>KEEP IT</div></RiseLine>
          <RiseLine delay={13}><Pill bg={C.orange} color={C.espresso} size={120} style={{ marginTop: 10 }}>SIMPLE.</Pill></RiseLine>
        </div>
      </WipeIn>
    </Sequence>
  </AbsoluteFill>
);

/* 0:07–0:09 PRODUCT REVEAL (split screen) ---------------------------------- */
export const Reveal = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frameIn = spring({ frame: f, fps, config: { damping: 22, stiffness: 140 } });
  const coverIn = spring({ frame: f - 6, fps, config: { damping: 16, stiffness: 120, mass: 1.1 } });
  const drift = interpolate(f, [0, 100], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      {/* food frame */}
      <div
        style={{
          position: "absolute", left: 60, right: 60, top: 230, height: 660, borderRadius: 48, overflow: "hidden",
          transform: `translateY(${(1 - frameIn) * -80}px) scale(${0.94 + frameIn * 0.06})`, opacity: frameIn,
          boxShadow: "0 30px 60px -30px rgba(48,32,24,.5)",
        }}
      >
        <OffthreadVideo muted src={staticFile("clips/c04_sizzle.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.1 - drift * 0.08})` }} />
      </div>
      {/* cover */}
      <div style={{ position: "absolute", right: 70, top: 640, transform: `translateY(${(1 - coverIn) * 420}px) scale(${0.85 + coverIn * 0.15 + drift * 0.03})` }}>
        <Cover width={440} rotY={interpolate(coverIn, [0, 1], [-38, -14]) + drift * 4} rotX={6} />
      </div>
      {/* title */}
      <div style={{ position: "absolute", left: 70, top: 930, width: 520 }}>
        <RiseLine delay={10}><div style={{ ...serif, fontSize: 210, color: C.orange }}>30</div></RiseLine>
        <RiseLine delay={14}><div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 62, lineHeight: 1, letterSpacing: "-0.02em", color: C.espresso }}>EASY AIR FRYER</div></RiseLine>
        <RiseLine delay={18}><div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 62, lineHeight: 1, letterSpacing: "-0.02em", color: C.espresso }}>RECIPES</div></RiseLine>
      </div>
    </AbsoluteFill>
  );
};

/* 0:09–0:16 VALUE ------------------------------------------------------------ */
const TimerIcon: React.FC<{ p: number }> = ({ p }) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle cx="32" cy="35" r="22" fill="none" stroke={C.espresso} strokeOpacity=".2" strokeWidth="7" />
    <circle cx="32" cy="35" r="22" fill="none" stroke={C.espresso} strokeWidth="7" strokeLinecap="round"
      strokeDasharray={`${2 * Math.PI * 22}`} strokeDashoffset={`${2 * Math.PI * 22 * (1 - p)}`} transform="rotate(-90 32 35)" />
    <rect x="26" y="4" width="12" height="7" rx="2" fill={C.espresso} />
  </svg>
);
const CalendarIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke={C.espresso} strokeWidth="6" strokeLinecap="round">
    <rect x="8" y="12" width="48" height="44" rx="8" /><path d="M8 26h48M20 6v12M44 6v12" />
    <path d="M18 36h6M30 36h6M42 36h4M18 46h6M30 46h6" />
  </svg>
);
const ListIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke={C.espresso} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 16 5 5 9-10M8 36l5 5 9-10M30 18h26M30 38h26M30 56h26M12 56h4" />
  </svg>
);

const FeatureCard: React.FC<{ at: number; icon: React.ReactNode; label: React.ReactNode; y: number; accent: string }> = ({ at, icon, label, y, accent }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - at, fps, config: { damping: 15, stiffness: 160 } });
  if (f < at - 1) return null;
  return (
    <div
      style={{
        position: "absolute", left: 70, right: 150, top: y, height: 150, borderRadius: 34, background: "rgba(255,248,239,.96)",
        display: "flex", alignItems: "center", gap: 26, padding: "0 30px",
        transform: `translateX(${(1 - p) * 560}px) rotate(${(1 - p) * 4}deg)`, opacity: interpolate(p, [0, 0.25], [0, 1], { extrapolateRight: "clamp" }),
        boxShadow: "0 24px 50px -20px rgba(0,0,0,.55)",
      }}
    >
      <div style={{ width: 100, height: 100, borderRadius: 26, background: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 52, lineHeight: 1, letterSpacing: "-0.025em", color: C.espresso }}>{label}</div>
    </div>
  );
};

export const Value: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame();
  const cuts: [string, number, number, string][] = [
    ["c05_chicken", 0, 66, "55% 55%"],
    ["c06_fries2", 66, 54, "50% 50%"],
    ["c07_salmon", 120, 54, "50% 60%"],
    ["c08_veg", 174, 54, "45% 50%"],
  ];
  const timerP = interpolate(f, [K.thirty - start, K.thirty - start + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      {cuts.map(([src, from, dur, origin]) => (
        <Sequence key={src} from={from} durationInFrames={dur}>
          <Footage src={src} dur={dur} from={1.16} to={1.02} origin={origin} />
        </Sequence>
      ))}
      <Scrim top={0.55} bottom={0.55} />
      {/* brand badge */}
      <div style={{ position: "absolute", left: 70, top: 250, display: "flex", alignItems: "center", gap: 20 }}>
        <Cover width={120} rotY={-12} rotX={0} />
        <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 46, lineHeight: 1, color: C.white, textShadow: "0 4px 20px rgba(0,0,0,.4)" }}>
          Air Fryer Meals<br /><span style={{ fontStyle: "italic", color: C.gold }}>for Two</span>
        </div>
      </div>
      <FeatureCard at={K.thirty - start} y={600} accent={C.orange} icon={<TimerIcon p={timerP} />} label={<>30 EASY<br />RECIPES</>} />
      <FeatureCard at={K.four - start} y={780} accent={C.gold} icon={<CalendarIcon />} label={<>4 WEEKLY<br />MEAL PLANS</>} />
      <FeatureCard at={K.grocery - start} y={960} accent="#F6E7D3" icon={<ListIcon />} label={<>GROCERY LISTS<br />INCLUDED</>} />
    </AbsoluteFill>
  );
};

/* 0:16–0:20 BONUS ------------------------------------------------------------ */
export const Bonus: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = K.ten - start - 4;
  const p = spring({ frame: f - at, fps, config: { damping: 11, stiffness: 140 } });
  const sweep = interpolate(f, [at + 8, at + 38], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Footage src="c09_cauli" dur={115} from={1.0} to={1.14} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(48,32,24,.15) 0%, rgba(48,32,24,.6) 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 480, textAlign: "center" }}>
        <div style={{ display: "inline-block", transform: `scale(${0.6 + p * 0.4})`, opacity: Math.min(1, p * 1.6), filter: "drop-shadow(0 10px 30px rgba(0,0,0,.45))" }}>
          <div
            style={{
              ...serif, fontSize: 340, color: "transparent", padding: "0 20px",
              backgroundImage: `linear-gradient(100deg, ${C.gold} 0%, ${C.gold} 42%, #FFF1C7 50%, ${C.gold} 58%, ${C.gold} 100%)`,
              backgroundSize: "300% 100%", backgroundPosition: `${sweep}% 0`, WebkitBackgroundClip: "text", backgroundClip: "text",
            }}
          >
            +10
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <RiseLine delay={at + 8}><Pill bg={C.gold} color={C.espresso} size={70}>BONUS QUICK DINNERS</Pill></RiseLine>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* 0:20–0:30 PRICE + CTA -------------------------------------------------------- */
export const Price: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frameIn = spring({ frame: f, fps, config: { damping: 22, stiffness: 120 } });
  const coverIn = spring({ frame: f - 8, fps, config: { damping: 15, stiffness: 110 } });
  const priceAt = K.eight - start - 3;
  const price = spring({ frame: f - priceAt, fps, config: { damping: 9, stiffness: 150, mass: 0.9 } });
  const ctaAt = K.tap - start;
  const cta = spring({ frame: f - ctaAt, fps, config: { damping: 14, stiffness: 160 } });
  // gentle CTA pulse that settles completely before the last 1.5 s
  const pulseEnd = 900 - start - 50;
  const pulse = f > ctaAt + 15 && f < pulseEnd ? Math.sin(((f - ctaAt) / fps) * Math.PI * 2 * 1.1) * 0.025 * interpolate(f, [pulseEnd - 20, pulseEnd], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const settle = interpolate(f, [0, pulseEnd], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      <div
        style={{
          position: "absolute", left: 60, right: 60, top: 210, height: 520, borderRadius: 52, overflow: "hidden",
          transform: `translateY(${(1 - frameIn) * -60}px)`, opacity: frameIn, boxShadow: "0 30px 60px -30px rgba(48,32,24,.5)",
        }}
      >
        <OffthreadVideo muted src={staticFile("clips/c10_plating.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 60%" }} />
      </div>
      <div style={{ position: "absolute", left: 70, top: 470, transform: `translateY(${(1 - coverIn) * 500}px) rotate(${(1 - coverIn) * -6}deg)` }}>
        <Cover width={360} rotY={interpolate(settle, [0, 1], [18, 10])} rotX={4} />
      </div>
      <div style={{ position: "absolute", left: 470, right: 60, top: 760 }}>
        <RiseLine delay={14}>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 50, letterSpacing: "0.04em", color: C.espresso }}>ALL FOR JUST</div>
        </RiseLine>
        <div style={{ ...serif, fontSize: 290, color: C.orange, marginTop: -6, transformOrigin: "20% 70%", transform: `scale(${price})`, opacity: Math.min(1, price * 2), textShadow: "0 10px 0 rgba(181,71,10,.18)" }}>
          $8
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1112, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <RiseLine delay={priceAt + 14}>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 40, letterSpacing: "0.06em", color: C.olive }}>✓ INSTANT DIGITAL ACCESS</div>
        </RiseLine>
      </div>
      <div
        style={{
          position: "absolute", left: 90, right: 90, top: 1180, height: 124, borderRadius: 999, background: C.orange,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 18,
          transform: `translateY(${(1 - cta) * 160}px) scale(${1 + pulse})`, opacity: Math.min(1, cta * 1.5),
          boxShadow: "0 10px 0 #B5470A, 0 30px 50px -20px rgba(48,32,24,.5)",
          fontFamily: SANS, fontWeight: 900, fontSize: 56, letterSpacing: "-0.01em", color: C.espresso,
        }}
      >
        GET YOUR COPY TODAY
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke={C.espresso} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m-6-6 6 6 6-6" /></svg>
      </div>
    </AbsoluteFill>
  );
};
