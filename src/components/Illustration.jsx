function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

const generatedBase = '/assets/generated/';

export const generatedIllustrations = {
  city: `${generatedBase}city-main.png`,
  workshop: `${generatedBase}workshop.png`,
  construction: `${generatedBase}construction-work.png`,
  sign: `${generatedBase}construction-sign.png`,
  harbor: `${generatedBase}city-thumb-harbor.png`,
  hill: `${generatedBase}city-thumb-hill.png`,
  station: `${generatedBase}city-thumb-station.png`,
  bag: `${generatedBase}equipment-bag.png`,
  desk: `${generatedBase}equipment-desk.png`,
  lamp: `${generatedBase}equipment-lamp.png`,
  shelf: `${generatedBase}equipment-shelf.png`,
  shoes: `${generatedBase}equipment-shoes.png`,
  water: `${generatedBase}equipment-water.png`,
};

export default function Illustration({
  name,
  src,
  alt = '',
  size = 'md',
  fit = 'contain',
  className = '',
  imageClassName = '',
  decorative = true,
}) {
  const sizes = {
    sm: 'h-[74px]',
    md: 'h-[132px]',
    lg: 'h-[248px]',
    hero: 'h-[390px]',
    wide: 'h-[156px]',
  };
  const imageSrc = src || generatedIllustrations[name];

  if (!imageSrc) return null;

  return (
    <div className={cx('relative flex w-full items-center justify-center overflow-visible', sizes[size] || sizes.md, className)}>
      <img
        src={imageSrc}
        alt={decorative ? '' : alt}
        aria-hidden={decorative ? 'true' : undefined}
        className={cx('h-full w-full select-none object-contain', fit === 'cover' && 'object-cover', imageClassName)}
        draggable="false"
      />
    </div>
  );
}

export function IllustrationTile({ name, src, title, subtitle, className = '' }) {
  return (
    <div className={cx('rounded-lg border border-[var(--color-border,#D8D0C1)] bg-[rgba(255,253,247,.72)] p-2', className)}>
      <Illustration name={name} src={src} size="sm" decorative />
      <p className="mt-1 truncate text-[12px] font-bold text-[var(--color-primary,#2F7F75)]">{title}</p>
      {subtitle ? <p className="mt-0.5 line-clamp-2 text-[10px] font-medium leading-snug text-[var(--color-text-muted,#69716C)]">{subtitle}</p> : null}
    </div>
  );
}
