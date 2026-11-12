import { getImage } from "../lib/assets";

interface Props {
  name?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  tone?: "orange" | "gold" | "olive" | "sand";
}

const tones = {
  orange: ["#F9C9A3", "#F47721"],
  gold: ["#FFE7A8", "#FFC857"],
  olive: ["#C9D6BC", "#556B42"],
  sand: ["#F0E0C8", "#D9B98A"],
};

/** Shows the real photo if present; otherwise a calm illustrated plate (never a fake "photo"). */
export function Photo({ name, alt, width, height, className = "", priority, tone = "sand" }: Props) {
  const src = getImage(name);
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  const [light, dark] = tones[tone];
  return (
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className}`}
    >
      <rect width="400" height="300" fill={light} />
      <circle cx="200" cy="150" r="104" fill="#FFFAF3" />
      <circle cx="200" cy="150" r="84" fill="none" stroke={dark} strokeOpacity=".25" strokeWidth="2" />
      <circle cx="170" cy="140" r="30" fill={dark} />
      <circle cx="226" cy="130" r="22" fill="#556B42" />
      <circle cx="216" cy="174" r="26" fill="#FFC857" />
      <circle cx="162" cy="182" r="14" fill="#302018" fillOpacity=".7" />
    </svg>
  );
}
