import { CtaButton } from "./CtaButton";

/** Mobile-only bar. Shown after the hero CTA leaves the viewport. */
export function StickyBar({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-espresso/10 bg-ivory/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-12px_rgba(48,32,24,.3)] transition-transform duration-200 md:hidden ${visible ? "translate-y-0" : "invisible translate-y-full"}`}
    >
      <CtaButton size="md" location="sticky">Get My Cookbook — $8</CtaButton>
    </div>
  );
}
