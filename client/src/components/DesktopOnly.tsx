import { useEffect, useState } from "react";

type DesktopOnlyProps = {
  children: React.ReactNode;
};

export default function DesktopOnly({ children }: DesktopOnlyProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  if (isMobile === null) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[999999] bg-[#0B0F19] text-white flex items-center justify-center px-6 overflow-hidden">
        <section className="max-w-md text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
            Versión escritorio
          </p>

          <h1 className="text-3xl font-bold mb-4">
            Este portfolio está optimizado para PC
          </h1>

          <p className="text-white/70 leading-relaxed">
            Para ver correctamente todos los proyectos, animaciones y detalles
            visuales, abre esta página desde un ordenador o una pantalla más
            grande.
          </p>
        </section>
      </div>
    );
  }

  return <>{children}</>;
}
