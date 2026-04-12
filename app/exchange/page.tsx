export const metadata = {
  title: "Sneaker Exchange | SneakPrice",
  description:
    "Live sneaker market dashboard — price charts, popularity trends, volatility scores, and blue chip rankings across top sneaker models.",
};

export default function SneakerExchangePage() {
  return (
    <iframe
      src="/exchange-dashboard.html"
      className="h-[calc(100vh-120px)] w-full border-0"
      title="Sneaker Exchange Dashboard"
    />
  );
}
