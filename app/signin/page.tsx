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

  redirect("/");
}

async function signOutUser() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete({ name: SESSION_COOKIE_NAME, path: "/" });
  redirect("/");
}

export default async function SignInPage() {
  const signedIn = await getSignedInUser();

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-xl space-y-10 rounded-3xl border border-black/10 bg-white p-10 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
        <h1 className="text-3xl font-bold">SneakPrice identity</h1>
        {signedIn ? (
          <div className="space-y-3">
            <p className="text-neutral-600">
              Signed in as{" "}
              <span className="font-semibold text-black">{signedIn.name}</span>{" "}
              <span className="text-xs text-neutral-400">({signedIn.email})</span>.
            </p>
            <form action={signOutUser}>
              <button
                type="submit"
                className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm uppercase tracking-[0.3em]"
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
              <form className="space-y-4" action={signInUser}>
                <p className="text-neutral-600">
                  Sign in with a display name. This is how sellers and buyers are
                  identified throughout the SneakPrice marketplace.
                </p>
                <input
                  name="name"
              placeholder="Display name (e.g., LaceUpLuther)"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black"
              required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black"
                  required
                />
            <button
              type="submit"
              className="w-full rounded-2xl border border-emerald-600/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-emerald-700 transition hover:border-emerald-600/50"
            >
              Save identity
            </button>
          </form>
        )}

        <Link
          href="/"
          className="text-sm text-neutral-600 underline underline-offset-4"
        >
          Back to marketplace
        </Link>
      </div>
    </main>
  );
}
