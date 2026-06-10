import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type BackgroundLayoutProps = {
  children: ReactNode;
};

type VerticalRainDrop = {
  left: string;
  delay: string;
  duration: string;
  color: "cyan" | "fuchsia" | "lime";
};

type HorizontalRainDrop = {
  top: string;
  delay: string;
  duration: string;
  color: "cyan" | "fuchsia" | "lime";
};

const GRID_SIZE = 40;

const colors: Array<"cyan" | "fuchsia" | "lime"> = ["cyan", "fuchsia", "lime"];

const getRainColorClass = (color: "cyan" | "fuchsia" | "lime") => {
  if (color === "fuchsia") return "grid-rain-fuchsia";
  if (color === "lime") return "grid-rain-lime";
  return "grid-rain-cyan";
};

export default function BackgroundLayout({ children }: BackgroundLayoutProps) {
  const [screenSize, setScreenSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const verticalRainDrops = useMemo<VerticalRainDrop[]>(() => {
    const columns = Math.ceil(screenSize.width / GRID_SIZE);

    // La mitad de luces verticales
    const dropsCount = Math.ceil(columns / 2);

    return Array.from({ length: dropsCount }, (_, index) => {
      const left = index * GRID_SIZE * 2;

      return {
        left: `${left}px`,
        delay: `${(index % 8) * 0.35}s`,
        duration: `${3.1 + (index % 5) * 0.25}s`,
        color: colors[index % colors.length],
      };
    });
  }, [screenSize.width]);

  const horizontalRainDrops = useMemo<HorizontalRainDrop[]>(() => {
    const rows = Math.ceil(screenSize.height / GRID_SIZE);

    // La mitad de luces horizontales
    const dropsCount = Math.ceil(rows / 2);

    return Array.from({ length: dropsCount }, (_, index) => {
      const top = index * GRID_SIZE * 2;

      return {
        top: `${top}px`,
        delay: `${(index % 7) * 0.45}s`,
        duration: `${4 + (index % 4) * 0.3}s`,
        color: colors[(index + 1) % colors.length],
      };
    });
  }, [screenSize.height]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D0221] text-white">
      {/* Grid de cuadrados */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Lluvia alineada con el grid, reducida a la mitad */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {verticalRainDrops.map((drop, index) => (
          <span
            key={`vertical-${index}`}
            className={`grid-rain-drop absolute top-[-180px] ${getRainColorClass(
              drop.color,
            )}`}
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
            }}
          />
        ))}

        {horizontalRainDrops.map((drop, index) => (
          <span
            key={`horizontal-${index}`}
            className={`grid-rain-drop-horizontal absolute left-[-180px] ${getRainColorClass(
              drop.color,
            )}`}
            style={{
              top: drop.top,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
            }}
          />
        ))}
      </div>

      {/* Gradientes de ambiente */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(188,19,254,0.16),transparent_35%),radial-gradient(circle_at_20%_30%,rgba(0,255,255,0.1),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(57,255,20,0.08),transparent_20%)]" />

      {/* Orbes suaves */}
      <div className="absolute left-[-120px] top-[120px] h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-[80px] right-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
