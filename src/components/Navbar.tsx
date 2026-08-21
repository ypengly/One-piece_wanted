import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--color-board)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg tracking-wide text-[var(--color-gold-light)]" style={{ fontFamily: "var(--font-display)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="6" r="2.4" />
            <line x1="12" y1="8.4" x2="12" y2="15" />
            <line x1="7" y1="11.5" x2="17" y2="11.5" />
            <path d="M6 15c0 4 2.7 6 6 6s6-2 6-6" />
          </svg>
          WANTED MAKER
        </NavLink>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-md px-3 py-2 transition ${isActive ? "text-[var(--color-gold-light)]" : "text-[var(--color-paper)]/70 hover:text-[var(--color-paper)]"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 transition ${isActive ? "text-[var(--color-gold-light)]" : "text-[var(--color-paper)]/70 hover:text-[var(--color-paper)]"}`
            }
          >
            Support
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
