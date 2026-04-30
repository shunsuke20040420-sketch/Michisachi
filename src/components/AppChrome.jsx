import { ChevronLeft, MoreHorizontal, Signal, Wifi } from 'lucide-react';
import BottomNav from './BottomNav.jsx';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BatteryIcon() {
  return (
    <span className="relative h-[10px] w-[20px] rounded-[3px] border border-[#242927]" aria-hidden="true">
      <span className="absolute -right-[3px] top-[3px] h-[4px] w-[2px] rounded-r-sm bg-[#242927]" />
      <span className="absolute inset-[2px] rounded-[1px] bg-[#242927]" />
    </span>
  );
}

export function StatusBar({ time = '9:41', className = '' }) {
  return (
    <div className={cx('flex h-[28px] shrink-0 items-center justify-between px-[18px] pt-2 text-[12px] font-semibold', className)}>
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5 fill-[#242927] stroke-[1.9]" aria-hidden="true" />
        <Wifi className="h-3.5 w-3.5 stroke-[2.1]" aria-hidden="true" />
        <BatteryIcon />
      </div>
    </div>
  );
}

export function TopBar({ title, subtitle, back = false, action, className = '' }) {
  return (
    <header className={cx('grid h-[58px] shrink-0 grid-cols-[42px_1fr_42px] items-center px-2', className)}>
      <div className="flex items-center justify-start">
        {back ? (
          <button type="button" className="grid h-8 w-8 place-items-center rounded-lg text-[var(--color-text,#2F3432)]" aria-label="戻る">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <div className="min-w-0 text-center">
        <h1 className="truncate text-[17px] font-bold tracking-normal">{title}</h1>
        {subtitle ? <p className="mt-0.5 truncate text-[10px] font-medium text-[var(--color-text-muted,#69716C)]">{subtitle}</p> : null}
      </div>
      <div className="flex items-center justify-end">
        {action || (
          <button type="button" className="grid h-8 w-8 place-items-center rounded-lg text-[var(--color-text,#2F3432)]" aria-label="その他">
            <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  );
}

export default function AppChrome({
  children,
  title,
  subtitle,
  activeTab,
  onTabChange,
  navItems,
  showNav = true,
  back = false,
  action,
  contentClassName = '',
  className = '',
}) {
  return (
    <div className={cx('flex h-full min-h-0 flex-col overflow-hidden', className)}>
      <StatusBar />
      <TopBar title={title} subtitle={subtitle} back={back} action={action} />
      <main className={cx('min-h-0 flex-1 overflow-hidden px-3 pb-3', contentClassName)}>{children}</main>
      {showNav ? <BottomNav items={navItems} activeId={activeTab} onSelect={onTabChange} /> : null}
    </div>
  );
}
