export function Footer({ text }: { text: string }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-[clamp(20px,4vw,48px)] py-6 font-mono text-xs text-muted">
        <span>{text}</span>
        <span className="flex min-h-11 items-center">© 2026 Caio Barilli</span>
      </div>
    </footer>
  );
}
