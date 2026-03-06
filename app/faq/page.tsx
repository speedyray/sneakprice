export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6 space-y-8">
      <h1 className="text-3xl font-bold">FAQ</h1>

      <div>
        <h2 className="font-semibold">How does SneakPrice work?</h2>
        <p className="text-gray-600">
          Upload or photograph a sneaker and our AI identifies the model
          and analyzes real resale market data to estimate its value.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">Where does pricing data come from?</h2>
        <p className="text-gray-600">
          SneakPrice analyzes active listings and historical sold listings
          across resale marketplaces to estimate market value.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">Is SneakPrice free?</h2>
        <p className="text-gray-600">
          SneakPrice currently offers a limited number of free scans per day.
        </p>
      </div>

      <div>
        <h2 className="font-semibold">Does SneakPrice guarantee resale prices?</h2>
        <p className="text-gray-600">
          No. SneakPrice provides estimates based on market data and trends.
        </p>
      </div>
    </div>
  );
}