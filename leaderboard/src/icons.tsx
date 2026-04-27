import type { ReactElement } from 'react';
import type { CategoryId } from './types';

const iconColor = 'var(--lb-icon-blue)';

const GLYPHS = {
  search: '\uE721',
  star: '\uE735',
  trophy: '\uED3F',
  education: '\uE7BE',
  presentation: '\uE7F4',
  smile: '\uE76E',
  chevronDown: '\uE70D',
  chevronUp: '\uE70E',
} as const;

function Mdl2Icon({
  glyph,
  size,
  color = 'currentColor',
  className = '',
}: {
  glyph: string;
  size: number;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`lb-mdl2-icon ${className}`.trim()}
      style={{ color, fontSize: size }}
      aria-hidden
    >
      {glyph}
    </span>
  );
}

export function SearchIcon() {
  return <Mdl2Icon glyph={GLYPHS.search} size={18} className="lb-icon" />;
}

export function StarIcon({
  variant = 'blue' as 'gold' | 'blue',
  size = 20,
}: {
  variant?: 'gold' | 'blue';
  size?: number;
}) {
  const fill = variant === 'gold' ? 'var(--lb-gold)' : 'var(--lb-star-blue)';
  return <Mdl2Icon glyph={GLYPHS.star} size={size} color={fill} />;
}

export function TrophyIcon() {
  return (
    <Mdl2Icon
      glyph={GLYPHS.trophy}
      size={22}
      color="var(--lb-trophy-stroke)"
    />
  );
}

export function IconEducation({ size = 32 }: { size?: number }) {
  return <Mdl2Icon glyph={GLYPHS.education} size={size} color={iconColor} />;
}

export function IconPublicSpeaking({ size = 32 }: { size?: number }) {
  return (
    <Mdl2Icon glyph={GLYPHS.presentation} size={size} color={iconColor} />
  );
}

export function IconUniversityPartners({ size = 32 }: { size?: number }) {
  return <Mdl2Icon glyph={GLYPHS.smile} size={size} color={iconColor} />;
}

const CAT_IC: Record<CategoryId, (props: { size?: number }) => ReactElement> = {
  Education: IconEducation,
  PublicSpeaking: IconPublicSpeaking,
  UniversityPartners: IconUniversityPartners,
};

export function categoryIcon(c: CategoryId, size?: number) {
  const I = CAT_IC[c];
  return <I size={size} />;
}

export function ChevronDown() {
  return <Mdl2Icon glyph={GLYPHS.chevronDown} size={14} />;
}

export function ChevronUp() {
  return <Mdl2Icon glyph={GLYPHS.chevronUp} size={14} />;
}
