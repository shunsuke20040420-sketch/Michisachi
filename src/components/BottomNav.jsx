import { Building2, CalendarDays, Hammer, MessageCircle, UsersRound } from 'lucide-react';

const defaultItems = [
  { id: 'city', label: '街', icon: Building2 },
  { id: 'today', label: '今日', icon: CalendarDays },
  { id: 'build', label: 'つくる', icon: Hammer },
  { id: 'community', label: 'みんな', icon: UsersRound },
  { id: 'talk', label: '相談', icon: MessageCircle },
];

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function BottomNav({ items = defaultItems, activeId = 'city', onSelect, className = '' }) {
  return (
    <nav
      className={cx(
        'grid h-[62px] shrink-0 grid-cols-5 border-t border-[var(--color-border,#D8D0C1)] bg-[rgba(255,253,247,.94)] px-2 pb-2 pt-1',
        className,
      )}
      aria-label="主要タブ"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item.id)}
            className={cx(
              'flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-[10px] font-semibold leading-tight transition-colors',
              active ? 'text-[var(--color-primary,#2F7F75)]' : 'text-[var(--color-text-muted,#69716C)]',
            )}
            aria-current={active ? 'page' : undefined}
          >
            <Icon
              aria-hidden="true"
              className={cx('h-[23px] w-[23px] stroke-[1.8]', active && 'fill-[rgba(47,127,117,.15)]')}
            />
            <span className="max-w-full truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export { defaultItems as bottomNavItems };
