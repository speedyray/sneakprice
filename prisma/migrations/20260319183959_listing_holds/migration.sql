-- AlterTable
ALTER TABLE "MarketplaceListing" ADD COLUMN "sellerId" TEXT;

-- CreateTable
CREATE TABLE "ListingHold" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "listingId" INTEGER NOT NULL,
    "buyerName" TEXT NOT NULL,
    "buyerId" TEXT,
    "expiresAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ListingHold_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "MarketplaceListing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ListingHold_listingId_idx" ON "ListingHold"("listingId");

-- CreateIndex
CREATE INDEX "ListingHold_buyerId_idx" ON "ListingHold"("buyerId");
