export type SellerDashboardMetrics = {
  inventoryValue: number;
  activeListingsValue: number;
  salesRevenue: number;
  totalProfit: number;
  itemsInInventory: number;
  activeListings: number;
  soldThisMonth: number;
  pendingPackages: number;
};

export type SellerInventoryRow = {
  id: string;
  name: string;
  brand: string | null;
  model: string | null;
  size: string | null;
  condition: string;
  purchasePrice: number;
  estimatedMarketValue: number;
  status: string;
  primaryImageUrl: string | null;
  acquiredAt: string | null;
};

export type SellerListingRow = {
  id: string;
  title: string;
  slug: string;
  price: number;
  status: string;
  size: string | null;
  brand: string | null;
  model: string | null;
  primaryImageUrl: string | null;
  viewsCount: number;
  favoritesCount: number;
  publishedAt: string | null;
};

export type SellerSaleRow = {
  id: string;
  orderNumber: string;
  listingTitle: string;
  salePrice: number;
  fees: number;
  shippingCost: number;
  payout: number;
  status: string;
  createdAt: string;
};

export type MarketplaceListingCard = {
  id: string;
  slug: string;
  title: string;
  brand: string | null;
  model: string | null;
  colorway: string | null;
  size: string | null;
  condition: string;
  price: number;
  primaryImageUrl: string | null;
  sellerStoreName: string | null;
  viewsCount: number;
  favoritesCount: number;
  publishedAt: string | null;
};