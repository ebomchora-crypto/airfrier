import { PRODUCT } from "../config";

export function Guarantee({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-start gap-4 text-left ${compact ? "" : "rounded-2xl border border-olive/30 bg-olive/5 p-5"}`}>
      <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="#556B42" />
        <path d="m15 24 6 6 12-13" fill="none" stroke="#FFFAF3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <p className="font-display text-lg font-semibold">{PRODUCT.guaranteeDays}-Day Money-Back Guarantee</p>
        <p className="mt-1 text-[0.95rem] leading-relaxed">
          Give the recipes a try. If the cookbook isn't right for you, request a refund within {PRODUCT.guaranteeDays} days
          of your purchase and get your money back.
        </p>
      </div>
    </div>
  );
}
