type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-6 border-b border-white/10 pb-5 md:mb-7 ${centered ? "text-center" : ""}`}
    >
      <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-cyan-300 md:mb-3 md:text-[11px] md:tracking-[0.4em]">
        {eyebrow}
      </p>
      <h2 className="break-words text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-2 max-w-2xl text-sm leading-6 text-white/60 ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
