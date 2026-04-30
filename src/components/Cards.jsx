import { ChevronRight } from 'lucide-react';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Card({ children, className = '', as: Component = 'section' }) {
  return (
    <Component className={cx('rounded-lg border border-[var(--color-border,#D8D0C1)] bg-[rgba(255,253,247,.78)] shadow-[0_1px_0_rgba(47,52,50,.04)]', className)}>
      {children}
    </Component>
  );
}

export function Chip({ children, icon: Icon, active = false, tone = 'neutral', className = '' }) {
  const tones = {
    neutral: active ? 'bg-[var(--color-primary,#2F7F75)] text-white' : 'bg-[#F6F2E9] text-[var(--color-text-muted,#69716C)]',
    gold: 'bg-[#F8EED7] text-[#8B6829]',
    green: 'bg-[#EDF5E8] text-[#4D7950]',
    blue: 'bg-[#E8F2F4] text-[#4F7787]',
    rose: 'bg-[#F8E8E2] text-[#A45644]',
  };

  return (
    <span
      className={cx(
        'inline-flex min-h-[26px] max-w-full items-center gap-1 rounded-lg border border-[rgba(216,208,193,.72)] px-2 text-[11px] font-semibold leading-none',
        tones[tone] || tones.neutral,
        className,
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 stroke-[1.8]" aria-hidden="true" /> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

export function MetricChip({ icon: Icon, label, value, tone = 'neutral' }) {
  return (
    <Chip icon={Icon} tone={tone} className="min-w-[70px] justify-center bg-[rgba(255,253,247,.9)] text-[var(--color-text,#2F3432)]">
      <span>{label}</span>
      <strong className="font-bold">{value}</strong>
    </Chip>
  );
}

export function IconBadge({ icon: Icon, tone = 'primary', className = '' }) {
  const tones = {
    primary: 'bg-[var(--color-primary,#2F7F75)] text-white',
    green: 'bg-[#7EA06F] text-white',
    gold: 'bg-[#C9A15A] text-white',
    rose: 'bg-[#D9826B] text-white',
    blue: 'bg-[#6F9FB5] text-white',
    muted: 'bg-[#ECE5D7] text-[var(--color-text-muted,#69716C)]',
  };

  return (
    <span className={cx('grid h-9 w-9 shrink-0 place-items-center rounded-lg', tones[tone] || tones.primary, className)}>
      {Icon ? <Icon className="h-5 w-5 stroke-[1.8]" aria-hidden="true" /> : null}
    </span>
  );
}

export function ListRow({ icon: Icon, image, title, subtitle, meta, tone = 'primary', onClick, className = '' }) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cx(
        'flex min-h-[54px] w-full min-w-0 items-center gap-2 rounded-lg border border-[var(--color-border,#D8D0C1)] bg-[rgba(255,253,247,.78)] px-2.5 py-2 text-left',
        onClick && 'transition hover:bg-[#F8F4EA]',
        className,
      )}
    >
      {image ? <img src={image} alt="" className="h-10 w-12 shrink-0 object-contain" /> : <IconBadge icon={Icon} tone={tone} />}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-bold leading-snug">{title}</span>
        {subtitle ? <span className="mt-0.5 block line-clamp-2 text-[11px] font-medium leading-snug text-[var(--color-text-muted,#69716C)]">{subtitle}</span> : null}
      </span>
      {meta ? <span className="shrink-0 text-[11px] font-semibold text-[var(--color-text-muted,#69716C)]">{meta}</span> : null}
      <ChevronRight className="h-4 w-4 shrink-0 text-[var(--color-text-muted,#69716C)]" aria-hidden="true" />
    </Component>
  );
}

export function PrimaryButton({ children, icon: Icon, className = '', ...props }) {
  return (
    <button
      type="button"
      className={cx(
        'flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--color-primary,#2F7F75),#28766e)] px-4 text-[14px] font-bold text-white shadow-[0_4px_10px_rgba(47,127,117,.18)] transition active:scale-[.99]',
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" /> : null}
      <span className="min-w-0 truncate">{children}</span>
    </button>
  );
}

export function SectionTitle({ children, action, className = '' }) {
  return (
    <div className={cx('mb-2 flex min-h-[28px] items-center justify-between gap-2', className)}>
      <h2 className="min-w-0 truncate text-[15px] font-bold">{children}</h2>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
