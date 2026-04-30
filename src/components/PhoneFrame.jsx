function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PhoneFrame({ children, label, className = '', screenClassName = '' }) {
  return (
    <figure className={cx('flex flex-col items-center gap-2', className)}>
      {label ? (
        <figcaption className="rounded-lg bg-[var(--color-primary,#2F7F75)] px-3 py-1 text-xs font-bold text-white shadow-sm">
          {label}
        </figcaption>
      ) : null}
      <div className="h-[640px] w-[320px] overflow-hidden rounded-[24px] border border-[#282d2b]/75 bg-[#FFFDF7] shadow-[0_12px_30px_rgba(47,52,50,.12)]">
        <div
          className={cx(
            'h-full w-full overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#fffdf8_0%,#faf7ef_48%,#f4f1ea_100%)] text-[var(--color-text,#2F3432)]',
            screenClassName,
          )}
        >
          {children}
        </div>
      </div>
    </figure>
  );
}
