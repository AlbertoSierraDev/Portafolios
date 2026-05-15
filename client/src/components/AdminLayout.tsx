import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineFolder,
  HiOutlineHome,
  HiOutlinePlus,
} from "react-icons/hi2";
import BackgroundLayout from "./BackgroundLayout";
import { logoutAdmin } from "../api/auth";

const navItems = [
  {
    label: "Proyectos",
    to: "/admin/projects",
    icon: HiOutlineFolder,
    isActive: (pathname: string) =>
      pathname === "/admin/projects" ||
      pathname === "/admin/projects/new" ||
      (pathname.startsWith("/admin/projects/") && pathname.endsWith("/edit")),
  },
  {
    label: "Mensajes",
    to: "/admin/messages",
    icon: HiOutlineChatBubbleLeftRight,
    isActive: (pathname: string) => pathname === "/admin/messages",
  },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";

  async function handleLogout() {
    try {
      await logoutAdmin();
    } finally {
      navigate("/login");
    }
  }

  if (isLoginPage) {
    return (
      <BackgroundLayout>
        <Outlet />
      </BackgroundLayout>
    );
  }

  return (
    <BackgroundLayout>
      <div className="min-h-screen px-4 py-4 text-white md:px-6 md:py-6">
        <div className="mx-auto flex max-w-[1600px] gap-6">
          <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 overflow-hidden rounded-[28px] border border-cyan-300/15 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[0_0_45px_rgba(34,211,238,0.08)] lg:flex lg:flex-col">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(232,121,249,0.1),transparent_38%)]" />

            <div className="relative z-10 flex h-full flex-col">
              <Link to="/admin/projects" className="mb-8 block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.15)]">
                    <HiOutlineBriefcase className="text-2xl" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                      Admin
                    </p>
                    <h1 className="text-lg font-black uppercase text-white">
                      Panel
                    </h1>
                  </div>
                </div>
              </Link>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = item.isActive(location.pathname);

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`group flex items-center gap-3 rounded-2xl border px-4 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                        active
                          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.12)]"
                          : "border-white/10 bg-black/20 text-white/55 hover:border-cyan-300/25 hover:bg-cyan-300/5 hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`text-xl transition ${
                          active
                            ? "text-cyan-300"
                            : "text-white/40 group-hover:text-cyan-300"
                        }`}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 rounded-2xl border border-lime-400/15 bg-lime-400/10 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-lime-400">
                  Acceso rápido
                </p>

                <Link
                  to="/admin/projects/new"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-lime-400/30 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-lime-400 transition hover:bg-lime-400/10"
                >
                  <HiOutlinePlus className="text-lg" />
                  Nuevo proyecto
                </Link>
              </div>

              <div className="mt-auto space-y-2">
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/55 transition hover:border-fuchsia-300/25 hover:bg-fuchsia-300/5 hover:text-fuchsia-300"
                >
                  <HiOutlineHome className="text-xl" />
                  Ver web
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-red-300 transition hover:bg-red-400/15"
                >
                  <HiOutlineArrowLeftOnRectangle className="text-xl" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <motion.header
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="sticky top-4 z-30 mb-6 rounded-[24px] border border-white/10 bg-[#0D0221]/80 p-4 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)] lg:hidden"
            >
              <div className="flex items-center justify-between gap-4">
                <Link to="/admin/projects" className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                    <HiOutlineBriefcase className="text-xl" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300">
                      Admin
                    </p>
                    <p className="text-sm font-black uppercase text-white">
                      Panel
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-300"
                >
                  Salir
                </button>
              </div>

              <nav className="mt-4 grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = item.isActive(location.pathname);

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                        active
                          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-300"
                          : "border-white/10 bg-black/20 text-white/55 hover:text-white"
                      }`}
                    >
                      <Icon className="text-lg" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.header>

            <main className="rounded-[28px] border border-white/10 bg-white/[0.025] p-4 backdrop-blur-sm md:p-6 lg:min-h-[calc(100vh-3rem)] lg:p-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}
