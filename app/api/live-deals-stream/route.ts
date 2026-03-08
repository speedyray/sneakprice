import { NextResponse } from "next/server";

const sneakers = [
  "Nike Dunk Panda",
  "Air Jordan 4 Fire Red",
  "Yeezy Boost 350 V2",
  "Jordan 1 Chicago",
  "New Balance 990",
  "Nike Dunk Low Grey Fog",
  "Adidas ZX 500 RM",
  "Adidas Galaxy 6",
  "Adidas Samba Vegan",
  "Air Jordan 1 Low",
  "Nike Air Force 1 Low",
  "Air Jordan 1 Retro High OG Chicago Off-White",
  "Nike SuperRep 3",
];

let index = 0;

export async function GET() {

  let interval: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {

      const sendDeal = () => {

        const sneaker = sneakers[index];
        index = (index + 1) % sneakers.length;

        const buy = Math.floor(Math.random() * 120) + 40;
        const market = buy + Math.floor(Math.random() * 80) + 20;

        const profit = market - buy;
        const roi = (profit / buy) * 100;

        const deal = {
          sneaker,
          buy_price: buy,
          market_price: market,
          profit,
          roi
        };

        try {
          controller.enqueue(`data: ${JSON.stringify(deal)}\n\n`);
        } catch {
          clearInterval(interval);
        }

      };

      // send first deal immediately
      sendDeal();

      // send every 3 seconds
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