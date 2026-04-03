import MarketplaceBrowsePage from "@/components/MarketplaceBrowsePage";
import StorefrontCategoryNav from "@/components/StorefrontCategoryNav";

export default function Page({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; created?: string }>;
}) {
  return (
    <>
      <StorefrontCategoryNav />
      <MarketplaceBrowsePage searchParams={searchParams} />
    </>
  );
}

