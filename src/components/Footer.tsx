export function Footer() {
  return (
    <footer className="bg-espresso pb-28 pt-8 text-center text-sm text-ivory/80 md:pb-8">
      <div className="container-page space-y-1">
        <p>© {new Date().getFullYear()} Air Fryer Meals for Two. Digital product — nothing will be shipped.</p>
        <p>Prices are in US dollars (USD). Payments are processed securely by Kiwify.</p>
      </div>
    </footer>
  );
}
