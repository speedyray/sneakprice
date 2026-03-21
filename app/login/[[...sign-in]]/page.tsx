import { SignIn } from "@clerk/nextjs";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ redirect_url?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const redirectUrl = resolvedSearchParams?.redirect_url || "/marketplace";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignIn
        fallbackRedirectUrl={redirectUrl}
        signUpFallbackRedirectUrl={redirectUrl}
      />
    </div>
  );
}
