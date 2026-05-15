import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin/bookings");
  }

  const params = await searchParams;
  const errorMessage = params.error?.trim();
  const nextPath = params.next?.startsWith("/admin") ? params.next : "/admin/bookings";

  return (
    <main data-admin-dashboard className="min-h-screen bg-[#17120f] px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold/90">
            Private Admin
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-none text-white">
            Bookings dashboard
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/72">
            Use the admin password to access the booking records, update statuses, and export data.
          </p>

          <form action="/api/admin/session" method="post" className="mt-8 space-y-5">
            <input type="hidden" name="next" value={nextPath} />

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-white/80">
                Admin password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white outline-none transition focus:border-gold focus:bg-black/30"
              />
            </div>

            {errorMessage && (
              <p className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gold px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#17120f] transition hover:bg-[#d5b56d]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
