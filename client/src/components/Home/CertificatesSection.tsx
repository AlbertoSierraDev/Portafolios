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
import SectionHeader from "../SectionHeader";
import ContentState from "../ContentState";
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
  const [slide, setSlide] = useState({ position: 0, previous: 0 });
  const [selectedCertificate, setSelectedCertificate] = useState<PublicCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isHidden, setIsHidden] = useState(() => document.hidden);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const activeIndex = certificates.length
    ? ((slide.position % certificates.length) + certificates.length) % certificates.length
    : 0;
  const isPaused = isHovered || isFocused || isTouching || isHidden;

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
    const handleVisibilityChange = () => setIsHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (certificates.length < 2 || isPaused || isReducedMotion || selectedCertificate) return;

    const timer = window.setTimeout(() => {
      setSlide((current) => ({ position: current.position + 1, previous: current.position }));
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [certificates.length, isPaused, isReducedMotion, selectedCertificate, slide.position]);

  if (loading) {
    return (
      <section className="px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeader eyebrow="Formación" title="Certificados" centered />
          <ContentState kind="loading" message="Cargando certificados..." />
        </div>
      </section>
    );
  }

  if (error || certificates.length === 0) {
    return (
      <section className="px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeader eyebrow="Formación" title="Certificados" centered />
          <ContentState kind={error ? "error" : "empty"} message={error ? "No se pudieron cargar los certificados." : "Todavía no hay certificados publicados."} />
        </div>
      </section>
    );
  }

  const certificate = certificates[activeIndex] || certificates[0];
  const hasNavigation = certificates.length > 1;

  function move(direction: -1 | 1) {
    setSlide((current) => ({ position: current.position + direction, previous: current.position }));
  }

  function selectIndex(index: number) {
    let distance = index - activeIndex;
    if (distance > certificates.length / 2) distance -= certificates.length;
    if (distance < -certificates.length / 2) distance += certificates.length;
    setSlide((current) => ({ position: current.position + distance, previous: current.position }));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!hasNavigation || selectedCertificate) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStart.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
    suppressClick.current = false;
    setIsTouching(true);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (!touchStart.current || !hasNavigation) {
      touchStart.current = null;
      setIsTouching(false);
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = event.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      suppressClick.current = true;
      move(deltaX < 0 ? 1 : -1);
    }
    touchStart.current = null;
    setIsTouching(false);
  }

  function markImageAsFailed(id: string) {
    setFailedImages((current) => new Set(current).add(id));
  }

  return (
    <section className="px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader eyebrow="Formación" title="Certificados" centered />

        <div role="region" aria-roledescription="carrusel" aria-label="Certificados" tabIndex={0}
          onKeyDown={handleKeyDown} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false); }}
          className="relative outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70">
          <div className="relative isolate h-[225px] touch-pan-y overflow-hidden sm:h-[290px] md:h-[340px] lg:h-[375px]"
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
            onTouchCancel={() => { touchStart.current = null; setIsTouching(false); }}>
            {/* Virtual slots preserve image identity while sliding through the loop. */}
            {(hasNavigation ? [-2, -1, 0, 1, 2] : [0]).map((offset) => {
              const position = slide.position + offset;
              const index = ((position % certificates.length) + certificates.length) % certificates.length;
              const item = certificates[index];
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 1;
              const previousOffset = position - slide.previous;

              return (
                <motion.button key={position} type="button" tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isVisible} aria-label={isActive ? `Abrir certificado ${item.title}` : `Seleccionar certificado ${item.title}`}
                  initial={{ x: `${previousOffset * 86 - 50}%`, scale: previousOffset === 0 ? 1 : 0.8, opacity: Math.abs(previousOffset) > 1 ? 0 : previousOffset === 0 ? 1 : 0.45 }}
                  animate={{ x: `${offset * 86 - 50}%`, scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : isVisible ? 0.45 : 0 }}
                  transition={{ duration: isReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ zIndex: isActive ? 20 : 10, pointerEvents: isVisible ? "auto" : "none" }}
                  onClick={() => {
                    if (suppressClick.current) { suppressClick.current = false; return; }
                    if (isActive) setSelectedCertificate(item);
                    else setSlide((current) => ({ position, previous: current.position }));
                  }}
                  className={`absolute left-1/2 top-4 flex h-[calc(100%-2rem)] w-[76%] items-center justify-center rounded-lg border bg-white/[0.035] p-2 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:w-[62%] sm:p-3 md:w-[48%] md:p-4 ${isActive ? "border-cyan-300/40 shadow-[0_0_32px_rgba(34,211,238,0.12)]" : "border-white/15"}`}>
                  {failedImages.has(item._id)
                    ? <HiOutlinePhoto className="text-6xl text-cyan-300/50" />
                    : <img src={item.image} alt={item.title} draggable={false} loading={isVisible ? "eager" : "lazy"}
                        onError={() => markImageAsFailed(item._id)} className="h-full w-full object-contain" />}
                </motion.button>
              );
            })}
          </div>

          <div className="relative mx-auto mt-4 max-w-2xl px-1 text-center md:mt-5">
            <div className="mb-4 flex items-center justify-center gap-5">
              {hasNavigation && <button type="button" onClick={() => move(-1)} aria-label="Certificado anterior" title="Certificado anterior" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-white/5 text-cyan-300 transition hover:border-cyan-300/60 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><HiOutlineArrowLeft className="text-xl" /></button>}
              <div className="flex min-w-20 items-center justify-center gap-2 text-xs tabular-nums text-white/50"><HiOutlineAcademicCap className="text-lg text-lime-400" />{String(activeIndex + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}</div>
              {hasNavigation && <button type="button" onClick={() => move(1)} aria-label="Siguiente certificado" title="Siguiente certificado" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-white/5 text-cyan-300 transition hover:border-cyan-300/60 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><HiOutlineArrowRight className="text-xl" /></button>}
            </div>
            <div className="grid min-h-40" aria-live={isPaused || isReducedMotion ? "polite" : "off"} aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={certificate._id} className="col-start-1 row-start-1 min-w-0"
                  initial={{ opacity: 0, y: isReducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: isReducedMotion ? 0 : -8 }} transition={{ duration: isReducedMotion ? 0 : 0.22 }}>
                  <h3 className="break-words text-lg font-semibold leading-snug text-white sm:text-xl md:text-2xl">{certificate.title}</h3>
                  <p className="mt-2 break-words text-xs font-semibold text-lime-400 sm:text-sm">{certificate.issuer}</p>
                  <p className="mt-2 min-h-5 text-xs text-white/45">{formatIssueDate(certificate.issueDate)}</p>
                  <p className="mt-3 min-h-12 line-clamp-2 whitespace-pre-line break-words text-sm leading-6 text-white/60">{certificate.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {hasNavigation && <div className="mt-5 flex flex-wrap justify-center gap-1" aria-label="Seleccionar certificado">
            {certificates.map((item, index) => <button key={item._id} type="button" onClick={() => selectIndex(index)}
              aria-label={`Mostrar certificado ${index + 1}: ${item.title}`} aria-current={index === activeIndex ? "true" : undefined}
              className="flex h-8 w-8 items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              <motion.span animate={{ width: index === activeIndex ? 24 : 8, backgroundColor: index === activeIndex ? "#67e8f9" : "#ffffff40" }}
                transition={{ duration: isReducedMotion ? 0 : 0.25 }} className="block h-1 rounded-full" />
            </button>)}
          </div>}
        </div>
      </div>

      <AnimatePresence>
        {selectedCertificate && <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} hasNavigation={hasNavigation} onPrevious={() => { move(-1); setSelectedCertificate(certificates[(activeIndex - 1 + certificates.length) % certificates.length]); }} onNext={() => { move(1); setSelectedCertificate(certificates[(activeIndex + 1) % certificates.length]); }} />}
      </AnimatePresence>
    </section>
  );
}
