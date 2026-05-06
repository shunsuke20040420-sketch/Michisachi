import { Search } from 'lucide-react';

// 検索バー
export function SfSearchBar({ placeholder = '街を検索...', value, onChange }) {
  return (
    <div className="sf-search">
      <Search aria-hidden="true" />
      <input
        className="sf-search__input"
        placeholder={placeholder}
        type="search"
        value={value ?? ''}
        onChange={onChange}
        aria-label={placeholder}
      />
    </div>
  );
}

// フィルターチップ行
export function SfFilterChips({ chips, activeKey, onSelect }) {
  return (
    <div className="sf-filter-row" role="group" aria-label="フィルター">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          className={`sf-chip${activeKey === c.key ? ' is-active' : ''}`}
          aria-pressed={activeKey === c.key}
          onClick={() => onSelect?.(c.key)}
        >
          {c.Icon && <c.Icon aria-hidden="true" style={{ width: 13, height: 13 }} />}
          {c.label}
        </button>
      ))}
    </div>
  );
}

// ユーザー行（アバター + 名前）
export function SfUserRow({ user, size = 'sm' }) {
  return (
    <div className="sf-user-row">
      <span
        className={`sf-avatar-placeholder${size === 'lg' ? ' sf-avatar-placeholder--lg' : ''}`}
        aria-hidden="true"
      >
        {user.initial}
      </span>
      <span>{user.name}</span>
    </div>
  );
}

// 汎用パネル
export function SfPanel({ title, children, className = '', style }) {
  return (
    <div className={`sf-panel ${className}`} style={style}>
      {title && <p className="sf-panel-title">{title}</p>}
      {children}
    </div>
  );
}
