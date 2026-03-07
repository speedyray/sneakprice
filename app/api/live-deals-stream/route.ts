import { NextResponse } from "next/server";

export async function GET() {

  let interval: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {

      const sendDeal = () => {

        const sneakers = [
  "Nike Dunk Panda",
  "Air Jordan 4 Fire Red",
  "Yeezy Boost 350 V2",
  "Jordan 1 Chicago",
  "New Balance 990",
  "Nike Dunk Low Grey Fog",
  "Adidas ZX 500 RM",
];

function generateDeal() {

  const sneaker = sneakers[Math.floor(Math.random() * sneakers.length)];

  const buy = Math.floor(Math.random() * 120) + 40;
  const market = buy + Math.floor(Math.random() * 80) + 20;

  const profit = market - buy;
  const roi = (profit / buy) * 100;

  return {
    sneaker,
    buy_price: buy,
    market_price: market,
    profit,
    roi
  };
}
  const deal = generateDeal();

        try {
          controller.enqueue(`data: ${JSON.stringify(deal)}\n\n`);
        } catch {
          clearInterval(interval);
        }

      };

      // send first deal immediately
      sendDeal();

      // send every 10 seconds
      interval = setInterval(sendDeal, 3000);

    },

    cancel() {
      clearInterval(interval);
    }

  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    }
  });
}
