import type { ReactNode } from "react";

type BackgroundLayoutProps = {
  children: ReactNode;
};

export default function BackgroundLayout({ children }: BackgroundLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D0221] text-white">
      {/* Grid de cuadrados */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

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
