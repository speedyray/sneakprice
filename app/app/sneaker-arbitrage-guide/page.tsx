export default function SneakerGuide() {
    return (
      <div className="min-h-screen bg-black text-white px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
  
          {/* TITLE */}
          <h1 className="text-4xl font-bold text-center">
            Sneaker Reselling Guide:  Arbitrage guide
          </h1>
  
          <p className="text-gray-400 text-lg text-center">
            Learn how sneaker resellers buy undervalued sneakers and flip them for
            profit using real resale market data.
          </p>
  
          {/* INTRO */}
          <p className="text-gray-300 leading-relaxed">
            Sneaker reselling has grown into a global marketplace where collectors
            and entrepreneurs buy sneakers at lower prices and sell them later for
            profit. With the rise of online marketplaces and resale platforms,
            sneaker flipping has become one of the most accessible ways to
            participate in the fashion resale economy.
          </p>
  
          {/* SECTION */}
          <h2 className="text-2xl font-semibold text-green-400">
            What Is Sneaker Reselling?
          </h2>
  
          <p className="text-gray-300 leading-relaxed">
            Sneaker reselling refers to purchasing sneakers at a lower price and
            selling them later on secondary marketplaces for a higher price. The
            difference between the purchase price and resale price becomes the
            reseller’s profit.
          </p>
  
          {/* SECTION */}
          <h2 className="text-2xl font-semibold text-green-400">
            How Sneaker Arbitrage Works
          </h2>
  
          <p className="text-gray-300 leading-relaxed">
            Sneaker arbitrage is when a reseller buys sneakers from one marketplace
            where prices are lower and sells them on another platform where buyers
            are willing to pay more.
          </p>
  
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p>Buy Price: $120</p>
            <p>Market Resale Price: $180</p>
            <p className="text-green-400 font-semibold">Profit Spread: $60</p>
          </div>
  
          {/* SECTION */}
          <h2 className="text-2xl font-semibold text-green-400">
            Where Resellers Find Cheap Sneakers
          </h2>
  
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Facebook Marketplace</li>
            <li>eBay auctions</li>
            <li>Outlet stores</li>
            <li>Mercari sneaker listings</li>
            <li>OfferUp local deals</li>
          </ul>
  
          {/* SECTION */}
          <h2 className="text-2xl font-semibold text-green-400">
            Where to Sell Sneakers for Profit
          </h2>
  
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>StockX sneaker marketplace</li>
            <li>GOAT resale platform</li>
            <li>eBay sneaker auctions</li>
            <li>Mercari resale listings</li>
          </ul>
  
          {/* CTA */}
          <div className="bg-gray-900 border border-green-500 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-400">
              Analyze Sneaker Resale Value
            </h3>
  
            <p className="text-gray-300 mt-2">
              Use SneakPrice to scan sneakers, analyze resale market prices,
              and detect potential arbitrage opportunities instantly.
            </p>
          </div>
  
        </div>
      </div>
    );
  }