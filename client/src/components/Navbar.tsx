import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] transition-all duration-300",
      isActive
        ? "text-cyan-300 bg-cyan-300/10 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
        : "text-white/70 hover:text-white hover:bg-white/5",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative flex h-4 w-4 shrink-0 ">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-60 blur-[3px]" />
            <span className="absolute inline-flex h-[120%] w-[120%] -translate-x-[10%] -translate-y-[10%] rounded-full bg-lime-400/30 blur-[6px]" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-lime-400 shadow-[0_0_14px_rgba(163,230,53,1),0_0_25px_rgba(163,230,53,0.5)]" />
          </span>

          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-white transition duration-300 group-hover:text-cyan-300 ">
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-white/5 text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.12)] md:hidden"
          aria-label="Abrir menú"
        >
          <HiOutlineMenuAlt3 size={22} />
        </button>
      </div>
    </header>
  );
}
