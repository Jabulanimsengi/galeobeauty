"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const tab = searchParams.get("tab") || "bookings";

  // Active state detection
  const isBookingsActive = pathname === "/admin/bookings" && tab === "bookings";
  const isLeadsActive = pathname === "/admin/bookings" && tab === "leads";
  const isAnalyticsActive = pathname === "/admin/bookings" && tab === "analytics";
  const isSubscribersActive = pathname === "/admin/bookings" && tab === "subscribers";

  async function handleLogout() {
    startTransition(async () => {
      await fetch("/api/admin/session", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    });
  }

  const navItems = [
    {
      label: "Bookings",
      href: "/admin/bookings?tab=bookings",
      active: isBookingsActive,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
    },
    {
      label: "Booking Leads",
      href: "/admin/bookings?tab=leads",
      active: isLeadsActive,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0 1 10.089 21c-2.243 0-4.32-.647-6.07-1.758A5.969 5.969 0 0 1 3 17.5a5.969 5.969 0 0 1 3.251-5.322 10.18 10.18 0 0 1 7.747-.58M15 9.128c0 1.69-.943 3.16-2.328 3.91M15 9.128a4.878 4.878 0 0 0-4.878-4.878c-1.162 0-2.221.405-3.053 1.08M15 9.128A4.878 4.878 0 0 1 10.122 14c-1.162 0-2.221-.405-3.053-1.08M10.122 4.25a3.878 3.878 0 1 0 0 7.756 3.878 3.878 0 0 0 0-7.756ZM19.75 11.25a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75ZM22.5 15a2.25 2.25 0 0 0-4.5 0 2.25 2.25 0 0 0 4.5 0Z" />
        </svg>
      ),
    },
    {
      label: "Analytics",
      href: "/admin/bookings?tab=analytics",
      active: isAnalyticsActive,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
    },
    {
      label: "Subscribers",
      href: "/admin/bookings?tab=subscribers",
      active: isSubscribersActive,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex h-16 w-full items-center justify-between border-b border-black/8 bg-[#17120f] px-4 text-white md:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Galeo Beauty</span>
          <span className="rounded-none bg-white/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/60">Admin</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-none p-2 text-white/80 hover:bg-white/5 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar Layout */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#17120f] px-5 py-6 text-white transition-transform duration-300 md:sticky md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/80">Galeo Beauty</span>
            <span className="mt-1 text-lg font-semibold tracking-tight text-white">Management Panel</span>
          </div>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-none p-1 text-white/60 hover:bg-white/5 hover:text-white md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="mb-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3.5 rounded-none px-4 py-3 text-sm font-medium tracking-[0.06em] transition-all duration-200 ${
                item.active
                  ? "bg-gold text-[#17120f] font-semibold shadow-md shadow-gold/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white hover:translate-x-1"
              }`}
            >
              <span className={item.active ? "text-[#17120f]" : "text-gold"}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Footer Profile & Logout */}
        <div className="flex items-center justify-between rounded-none bg-white/5 p-3.5 border border-white/5">
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-white/90 truncate">Administrator</span>
            <span className="text-[10px] text-white/40 truncate">System Session</span>
          </div>
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="rounded-none p-2 text-white/60 hover:bg-white/10 hover:text-red-400 transition-colors disabled:opacity-50"
            title="Sign out"
          >
            {isPending ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
            )}
          </button>
        </div>
      </aside>

      {/* Backdrop for open mobile sidebar */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}
