import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineArrowUpRight,
  HiOutlineXMark,
} from "react-icons/hi2";
import type { PublicCertificate } from "../types/certificate";

type CertificateModalProps = {
  certificate: PublicCertificate;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasNavigation?: boolean;
};

function formatIssueDate(value: string | null) {
  if (!value) return "";

  return new Date(value).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });
}

export default function CertificateModal({
  certificate,
  onClose,
  onPrevious,
  onNext,
  hasNavigation = false,
}: CertificateModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && hasNavigation) {
        onPrevious?.();
        return;
      }

      if (event.key === "ArrowRight" && hasNavigation) {
        onNext?.();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      previousActiveElement?.focus();
    };
  }, [hasNavigation, onClose, onNext, onPrevious]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#05010f]/90 px-4 py-6 backdrop-blur-md sm:px-6"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-y-auto rounded-[24px] border border-cyan-300/20 bg-[#0D0221]/95 p-5 text-white shadow-[0_0_55px_rgba(34,211,238,0.16)] sm:p-7 md:rounded-[32px] md:p-10"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar certificado"
          className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 p-2 text-white/70 transition hover:border-cyan-300/40 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 md:right-6 md:top-6"
        >
          <HiOutlineXMark className="text-xl" />
        </button>

        <div className="grid gap-7 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:items-center md:gap-10">
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-cyan-300/10 bg-black/25 p-3 sm:min-h-[300px] md:min-h-[430px] md:p-5">
            <img
              src={certificate.image}
              alt={`Imagen ampliada del certificado ${certificate.title}`}
              className="max-h-[52vh] w-full object-contain md:max-h-[68vh]"
            />
          </div>

          <div className="min-w-0">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-cyan-300">Certificación</p>
            <h2 id="certificate-modal-title" className="break-words text-2xl font-black uppercase leading-tight sm:text-3xl md:text-4xl">
              {certificate.title}
            </h2>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-lime-400">{certificate.issuer}</p>
            {certificate.issueDate && <p className="mt-3 text-sm text-white/50">{formatIssueDate(certificate.issueDate)}</p>}
            <p className="mt-6 whitespace-pre-line text-sm leading-7 text-white/75 sm:text-base sm:leading-8">{certificate.description}</p>

            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-md border border-cyan-200/60 bg-cyan-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D0221] shadow-[0_0_20px_rgba(103,232,249,0.3)] transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
              >
                Ver credencial
                <HiOutlineArrowUpRight className="text-base" />
              </a>
            )}
          </div>
        </div>

        {hasNavigation && (
          <div className="mt-7 flex justify-between gap-3 border-t border-white/10 pt-5">
            <button type="button" onClick={onPrevious} aria-label="Certificado anterior" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 transition hover:border-cyan-300/30 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"><HiOutlineArrowLeft />Anterior</button>
            <button type="button" onClick={onNext} aria-label="Siguiente certificado" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 transition hover:border-cyan-300/30 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60">Siguiente<HiOutlineArrowRight /></button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
