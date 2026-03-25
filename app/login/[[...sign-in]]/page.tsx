import { SignIn } from "@clerk/nextjs";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ redirect_url?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const redirectUrl = resolvedSearchParams?.redirect_url || "/marketplace";

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-10">
      <SignIn
        fallbackRedirectUrl={redirectUrl}
        signUpFallbackRedirectUrl={redirectUrl}
      />
    </div>
  );
}
