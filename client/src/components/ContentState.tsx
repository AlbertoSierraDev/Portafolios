import type { ReactNode } from "react";
import { HiOutlineExclamationTriangle, HiOutlineFolder, HiOutlineArrowPath } from "react-icons/hi2";
import { visual } from "../styles/visual";

type ContentStateProps = {
  kind: "loading" | "empty" | "error";
  message: string;
  children?: ReactNode;
};

export default function ContentState({ kind, message, children }: ContentStateProps) {
  const Icon = kind === "loading" ? HiOutlineArrowPath : kind === "error" ? HiOutlineExclamationTriangle : HiOutlineFolder;
  return (
    <div role={kind === "error" ? "alert" : "status"} aria-busy={kind === "loading"} className={`${visual.panel} flex min-h-48 flex-col items-center justify-center gap-4 px-5 py-8 text-center`}>
      <Icon aria-hidden="true" className={`text-2xl ${kind === "error" ? "text-fuchsia-300" : "text-cyan-300"} ${kind === "loading" ? "animate-spin motion-reduce:animate-none" : ""}`} />
      <p className="text-sm leading-6 text-white/70">{message}</p>
      {children}
    </div>
  );
}
