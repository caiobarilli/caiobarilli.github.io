/** Striped box that stands in for a screenshot until the real image exists. */
export function Placeholder({ label, file, className = "" }: { label: string; file: string; className?: string }) {
  return (
    <div className={`placeholder-stripes flex flex-col items-start justify-between p-3.5 font-mono text-[11px] text-faint ${className}`}>
      <span className="rounded-full border border-dashed border-line-strong px-2 py-0.5">{label}</span>
      <span>{file}</span>
    </div>
  );
}
