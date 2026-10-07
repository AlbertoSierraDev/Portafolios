import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative rounded-md px-4 py-2 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
      isActive
        ? "bg-cyan-300/10 text-cyan-300"
        : "text-white/70 hover:bg-white/5 hover:text-white",
    ].join(" ");

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "block rounded-md px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
      isActive
        ? "bg-cyan-300/10 text-cyan-300"
        : "text-white/75 hover:bg-white/5 hover:text-white",
    ].join(" ");

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0D0221]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1580px] items-center justify-between px-4 py-4 sm:px-6 md:px-6 md:py-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <span className="relative flex h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-60 blur-[3px]" />
            <span className="absolute inline-flex h-[120%] w-[120%] -translate-x-[10%] -translate-y-[10%] rounded-full bg-lime-400/30 blur-[6px]" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-lime-400 sm:h-4 sm:w-4" />
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition duration-300 group-hover:text-cyan-300 sm:text-sm sm:tracking-[0.32em]">
            ALBERTOSIERRA.ES
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
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
          className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-300/20 bg-white/5 text-cyan-300 backdrop-blur-md transition hover:bg-cyan-300/10 sm:h-11 sm:w-11 md:hidden"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
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
          <nav id="mobile-navigation" aria-label="Navegación móvil" className="rounded-lg border border-white/10 bg-white/[0.035] p-2">
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
