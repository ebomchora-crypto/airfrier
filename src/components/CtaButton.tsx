import type { ReactNode } from "react";
import { CHECKOUT_URL } from "../config";
import { trackCheckoutClick } from "../lib/track";

interface Props {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
  location: string;
  buttonRef?: React.Ref<HTMLAnchorElement>;
}

/** Every purchase button on the page is this component → one URL, one style, one tracking event. */
export function CtaButton({ children, className = "", size = "lg", location, buttonRef }: Props) {
  const sizing = size === "lg" ? "min-h-[56px] px-7 text-lg" : "min-h-[48px] px-6 text-base";
  return (
    <a
      ref={buttonRef}
      href={CHECKOUT_URL}
      onClick={() => trackCheckoutClick(location)}
      className={`inline-flex w-full items-center justify-center rounded-full bg-orange font-bold text-espresso shadow-[0_6px_0_#B5470A] transition active:translate-y-[3px] active:shadow-[0_3px_0_#B5470A] hover:brightness-105 sm:w-auto ${sizing} ${className}`}
    >
      {children}
    </a>
  );
}
