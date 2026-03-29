export default function NewsPage() {
    const articles = [
      {
        title: "Nike Air Jordan Market is Heating Up",
        source: "Sneaker News",
      },
      {
        title: "Top 10 Sneakers to Flip in 2026",
        source: "Hypebeast",
      },
      {
        title: "Adidas Yeezy Resale Trends Explained",
        source: "Complex",
      },
    ];
  
    return (
      <main className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">Sneaker News</h1>
  
        <div className="space-y-4">
          {articles.map((article, i) => (
            <div key={i} className="border p-4 rounded-xl">
              <h2 className="font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">{article.source}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }