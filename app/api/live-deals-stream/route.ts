// app/api/live-deals-stream/route.ts
// Streams real arbitrage deals from Postgres via Server-Sent Events.
// On connect: immediately sends top-20 active deals sorted by dealScore desc.
// Polling: checks for new deals every 30 seconds and pushes any found.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

async function fetchTopDeals(since?: Date) {
  return prisma.deal.findMany({
    where: {
      isActive: true,
      dealScore: { gte: 40 },
      ...(since ? { updatedAt: { gt: since } } : {}),
    },
    orderBy: { dealScore: "desc" },
    take: since ? 5 : 20,
    select: {
      id: true,
      sneaker: true,
      brand: true,
      size: true,
      imageUrl: true,
      buyPlatform: true,
      buyPrice: true,
      buyUrl: true,
      sellPlatform: true,
      sellPrice: true,
      sellUrl: true,
      platformSellFee: true,
      paymentFee: true,
      shippingBuy: true,
      shippingSell: true,
      authFee: true,
      netProfit: true,
      profitMargin: true,
      dealScore: true,
      dealLabel: true,
      scoredBy: true,
      demandTrend: true,
      created_at: true,
      expiresAt: true,
    },
  });
}

export async function GET() {
  let pollInterval: NodeJS.Timeout;
  let lastChecked = new Date();

  const stream = new ReadableStream({
    async start(controller) {
      // Send top deals immediately on connect
      try {
        const initialDeals = await fetchTopDeals();

        if (initialDeals.length > 0) {
          for (const deal of initialDeals) {
            controller.enqueue(`data: ${JSON.stringify(deal)}\n\n`);
          }
        } else {
          // No deals in DB yet — send a placeholder so the client knows we connected
          controller.enqueue(
            `data: ${JSON.stringify({ _status: "no_deals_yet" })}\n\n`
          );
        }
      } catch {
        // DB not ready — send placeholder
        controller.enqueue(
          `data: ${JSON.stringify({ _status: "db_unavailable" })}\n\n`
        );
      }

      // Poll for new deals every 30 seconds
      pollInterval = setInterval(async () => {
        try {
          const newDeals = await fetchTopDeals(lastChecked);
          lastChecked = new Date();

          for (const deal of newDeals) {
            controller.enqueue(`data: ${JSON.stringify(deal)}\n\n`);
          }
        } catch {
          clearInterval(pollInterval);
        }
      }, 30_000);
    },

    cancel() {
      clearInterval(pollInterval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
