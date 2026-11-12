export function Footer() {
  return (
    <footer className="bg-espresso pb-28 pt-8 text-center text-sm text-ivory/80 md:pb-8">
      <div className="container-page">
        <p>© {new Date().getFullYear()} Air Fryer Meals for Two. Digital product — no physical item will be shipped.</p>
        <p className="mt-1">Payments are processed securely on the checkout page.</p>
      </div>
    </footer>
  );
}
