import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, getSignedInUser } from "@/lib/session";

async function signInUser(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  if (!name || !email) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: encodeURIComponent(JSON.stringify({ name, email })),
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  redirect("/marketplace");
}

async function signOutUser() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME, { path: "/" });
  redirect("/marketplace");
}

export default async function SignInPage() {
  const signedIn = await getSignedInUser();

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-xl space-y-10 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-10">
        <h1 className="text-3xl font-bold">SneakPrice identity</h1>
        {signedIn ? (
          <div className="space-y-3">
            <p className="text-neutral-300">
              Signed in as <span className="font-semibold">{signedIn}</span>.
            </p>
            <form action={signOutUser}>
              <button
                type="submit"
                className="rounded-2xl border border-neutral-800 px-4 py-2 text-sm uppercase tracking-[0.3em]"
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
              <form className="space-y-4" action={signInUser}>
                <p className="text-neutral-400">
                  Sign in with a display name. This is how sellers and buyers are
                  identified throughout the SneakPrice marketplace.
                </p>
                <input
                  name="name"
              placeholder="Display name (e.g., LaceUpLuther)"
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white"
              required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white"
                  required
                />
            <button
              type="submit"
              className="w-full rounded-2xl border border-emerald-500/60 bg-emerald-500/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-emerald-200 transition hover:border-emerald-400"
            >
              Save identity
            </button>
          </form>
        )}

        <Link
          href="/marketplace"
          className="text-sm text-neutral-400 underline underline-offset-4"
        >
          Back to marketplace
        </Link>
      </div>
    </main>
  );
}
