import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] transition-all duration-300",
      isActive
        ? "bg-cyan-300/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
        : "text-white/70 hover:bg-white/5 hover:text-white",
    ].join(" ");

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "block rounded-2xl px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] transition-all duration-300",
      isActive
        ? "bg-cyan-300/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.16)]"
        : "text-white/75 hover:bg-white/5 hover:text-white",
    ].join(" ");

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-6 md:py-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <span className="relative flex h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-60 blur-[3px]" />
            <span className="absolute inline-flex h-[120%] w-[120%] -translate-x-[10%] -translate-y-[10%] rounded-full bg-lime-400/30 blur-[6px]" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-lime-400 shadow-[0_0_14px_rgba(163,230,53,1),0_0_25px_rgba(163,230,53,0.5)] sm:h-4 sm:w-4" />
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition duration-300 group-hover:text-cyan-300 sm:text-sm sm:tracking-[0.32em]">
            ALBERTOSIERRA.ES
          </span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-3 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_40px_rgba(34,211,238,0.06)] md:flex">
          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>

          <NavLink to="/projects" className={navLinkClass}>
            Proyectos
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contacto
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-white/5 text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.12)] transition hover:bg-cyan-300/10 sm:h-11 sm:w-11 md:hidden"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <HiOutlineX size={22} />
          ) : (
            <HiOutlineMenuAlt3 size={22} />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="px-4 pb-4 md:hidden">
          <nav className="rounded-[24px] border border-cyan-300/15 bg-[#0D0221]/90 p-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_35px_rgba(34,211,238,0.1)]">
            <NavLink to="/" onClick={closeMenu} className={mobileNavLinkClass}>
              Inicio
            </NavLink>

            <NavLink
              to="/projects"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Proyectos
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Contacto
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
