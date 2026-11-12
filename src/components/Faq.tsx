const faqs = [
  ["Is this a physical cookbook?", "No. It's a digital cookbook — nothing will be shipped. You get instant online access right after your purchase."],
  ["How do I get my cookbook?", "Right after checkout, you'll receive an email with your access details. Be sure to check your spam or promotions folder if you don't see it."],
  ["Are the recipes beginner-friendly?", "Yes! The recipes include ingredients, quantities, and step-by-step instructions."],
  ["Are these meals really for two people?", "The recipes are designed around two-person portions, although individual appetites may vary."],
  ["Can I use the cookbook on my phone?", "Yes. You can open it on your phone, tablet, or computer."],
  ["Will I need special ingredients?", "Most recipes focus on familiar ingredients commonly available in grocery stores."],
  ["Can I buy from outside the US?", "Yes. The price is $8 in US dollars. If your card is in another currency, your bank converts it automatically at its own rate."],
  ["Is this a subscription?", "No. It's a one-time purchase of $8. You won't be charged again."],
  ["What if it's not for me?", "You're covered by a 7-day money-back guarantee. If the cookbook isn't right for you, request a refund within 7 days of your purchase."],
];

export function Faq() {
  return (
    <section className="bg-sand py-14 sm:py-20" aria-labelledby="faq-h">
      <div className="container-page max-w-3xl">
        <h2 id="faq-h" className="section-title">Questions? We've Got Answers.</h2>
        <div className="mt-8 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-2xl border border-espresso/10 bg-white shadow-card">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-base font-semibold sm:text-lg [&::-webkit-details-marker]:hidden">
                {q}
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="px-5 pb-5 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
