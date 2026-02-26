-- CreateTable
CREATE TABLE "SneakerScan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "query" TEXT NOT NULL,
    "medianPrice" REAL NOT NULL,
    "averagePrice" REAL NOT NULL,
    "lowestPrice" REAL NOT NULL,
    "highestPrice" REAL NOT NULL,
    "volatility" REAL NOT NULL,
    "marketLabel" TEXT NOT NULL,
    "totalListings" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
