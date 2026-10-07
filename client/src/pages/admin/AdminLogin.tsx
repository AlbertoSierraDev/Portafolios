import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { visual } from "../../styles/visual";
import { loginAdmin } from "../../api/auth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAdmin(username, password);
      navigate("/admin/projects");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className={`${visual.panel} w-full max-w-md p-6 sm:p-8`}>
        <div className="mb-8 text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-cyan-300">
            Panel de control
          </p>
          <h1 className="text-3xl font-black uppercase text-white">
            Admin login
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/65">
            Accede con tu usuario y contraseña para gestionar los proyectos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-username" className="mb-2 block text-sm font-medium text-white/70">
              Usuario
            </label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={`${visual.input} px-4`}
              placeholder="Tu usuario"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-white/70">
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${visual.input} px-4`}
              placeholder="Tu contraseña"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="rounded-md border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`${visual.button} w-full`}
          >
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </section>
  );
}
