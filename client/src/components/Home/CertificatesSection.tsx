import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineAcademicCap,
  HiOutlinePhoto,
} from "react-icons/hi2";
import { getCertificates } from "../../api/certificates";
import type { PublicCertificate } from "../../types/certificate";
import CertificateModal from "../CertificateModal";

function formatIssueDate(value: string | null) {
  if (!value) return "";

  return new Date(value).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });
}

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<PublicCertificate[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState<PublicCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCertificates() {
      try {
        const data = await getCertificates();
        if (isMounted) setCertificates(data);
      } catch {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCertificates();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setIsReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => setIsPaused(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (certificates.length < 2 || isPaused || isReducedMotion || selectedCertificate) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % certificates.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [certificates.length, isPaused, isReducedMotion, selectedCertificate]);

  if (loading) {
    return (
      <section className="flex min-h-screen snap-start flex-col justify-start px-4 py-8 sm:px-5 sm:py-10 md:justify-center md:px-10 md:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6 h-20 max-w-2xl animate-pulse rounded-2xl bg-white/[0.04]" />
          <div className="h-[300px] animate-pulse rounded-[28px] border border-white/10 bg-white/[0.04]" />
        </div>
      </section>
    );
  }

  if (error || certificates.length === 0) return null;

  const certificate = certificates[activeIndex] || certificates[0];
  const hasNavigation = certificates.length > 1;

  function move(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + certificates.length) % certificates.length);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || !hasNavigation) return;
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStart.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
    setIsPaused(true);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (!touchStart.current || !hasNavigation) {
      touchStart.current = null;
      setIsPaused(false);
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = event.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) move(deltaX < 0 ? 1 : -1);
    touchStart.current = null;
    setIsPaused(false);
  }

  function markImageAsFailed(id: string) {
    setFailedImages((current) => new Set(current).add(id));
  }

  return (
    <section className="flex min-h-screen snap-start flex-col justify-start px-4 py-8 sm:px-5 sm:py-10 md:justify-center md:px-10 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: "easeOut" }} className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-lime-400 md:mb-3 md:text-[11px] md:tracking-[0.4em]">Formación</p>
            <h2 className="text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:text-5xl">CERTIFICADOS</h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-white/70 sm:text-sm md:mt-4 md:text-base md:leading-7">Credenciales y formación que respaldan mi recorrido técnico.</p>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/45"><HiOutlineAcademicCap className="text-lg text-lime-400" />{activeIndex + 1} / {certificates.length}</div>
        </motion.div>

        <div ref={sectionRef} role="region" aria-roledescription="carrusel" aria-label="Certificados" tabIndex={0} onKeyDown={handleKeyDown} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false); }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="relative outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={certificate._id} initial={isReducedMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={isReducedMotion ? undefined : { opacity: 0, x: -24 }} transition={{ duration: isReducedMotion ? 0 : 0.3, ease: "easeOut" }}>
              <button type="button" onClick={() => setSelectedCertificate(certificate)} className="group relative grid w-full gap-4 overflow-hidden rounded-[24px] border border-cyan-300/15 bg-white/[0.04] p-3 text-left backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.08)] transition hover:border-cyan-300/35 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)] focus:outline-none focus:ring-2 focus:ring-cyan-300/70 sm:p-4 md:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)] md:gap-6 md:rounded-[28px] md:p-5 lg:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(163,230,53,0.08),transparent_38%)]" />
                <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-3 sm:min-h-[240px] md:min-h-[300px] md:p-5">
                  {failedImages.has(certificate._id) ? <HiOutlinePhoto className="text-6xl text-cyan-300/50" /> : <img src={certificate.image} alt={certificate.title} loading={activeIndex === 0 ? "eager" : "lazy"} onError={() => markImageAsFailed(certificate._id)} className="max-h-[42vh] w-full object-contain transition duration-500 group-hover:scale-[1.02]" />}
                </div>
                <div className="relative flex flex-col justify-center py-1 md:py-3">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">Certificación {String(activeIndex + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 break-words text-xl font-black uppercase leading-tight text-white sm:text-2xl md:text-3xl">{certificate.title}</h3>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-lime-400">{certificate.issuer}</p>
                  {certificate.issueDate && <p className="mt-2 text-sm text-white/45">{formatIssueDate(certificate.issueDate)}</p>}
                  <p className="mt-4 line-clamp-5 whitespace-pre-line text-sm leading-6 text-white/70 md:text-sm md:leading-7">{certificate.description}</p>
                  <span className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 transition group-hover:gap-3">Ver certificado <HiOutlineArrowRight className="text-base" /></span>
                </div>
              </button>
            </motion.div>
          </AnimatePresence>

          {hasNavigation && <>
            <button type="button" onClick={() => move(-1)} aria-label="Certificado anterior" className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-300/25 bg-[#0D0221]/85 p-2.5 text-cyan-300 shadow-lg transition hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 sm:left-4 md:left-6 md:p-3"><HiOutlineArrowLeft className="text-lg md:text-xl" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Siguiente certificado" className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-300/25 bg-[#0D0221]/85 p-2.5 text-cyan-300 shadow-lg transition hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 sm:right-4 md:right-6 md:p-3"><HiOutlineArrowRight className="text-lg md:text-xl" /></button>
          </>}
        </div>

        {hasNavigation && <div className="mt-4 flex justify-center gap-2" aria-label="Seleccionar certificado">
          {certificates.map((item, index) => <button key={item._id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Mostrar certificado ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-300/70 ${index === activeIndex ? "w-8 bg-cyan-300" : "w-2 bg-white/25 hover:bg-white/50"}`} />)}
        </div>}
      </div>

      <AnimatePresence>
        {selectedCertificate && <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} hasNavigation={hasNavigation} onPrevious={() => { move(-1); setSelectedCertificate(certificates[(activeIndex - 1 + certificates.length) % certificates.length]); }} onNext={() => { move(1); setSelectedCertificate(certificates[(activeIndex + 1) % certificates.length]); }} />}
      </AnimatePresence>
    </section>
  );
}
