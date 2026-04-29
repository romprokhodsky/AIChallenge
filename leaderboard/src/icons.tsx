import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { CategoryId } from './types';

const iconBlue = 'var(--lb-icon-blue)';

/** All category strip icons share Lucide-style outline art at this size and stroke. */
const CATEGORY_ICON_BOX = 20;
const CATEGORY_STROKE = 1.35;

function FaI({
  faClass,
  className = '',
  size = 16,
  color,
}: {
  faClass: string;
  className?: string;
  size?: number;
  color?: string;
}) {
  const style: CSSProperties = {
    fontSize: size,
    width: '1em',
    height: '1em',
    ...(color ? { color } : {}),
  };
  return (
    <i
      className={`${faClass} lb-fa-icon ${className}`.trim()}
      style={style}
      aria-hidden
    />
  );
}

/** Lucide-aligned outline icons for categories (fixed 20×20; ignores legacy `size` from callers). */
function CategoryOutlineIcon({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <i
      className={`lb-fa-icon lb-category-outline-icon ${className ?? ''}`.trim()}
      style={{
        width: CATEGORY_ICON_BOX,
        height: CATEGORY_ICON_BOX,
        color: iconBlue,
      }}
      aria-hidden
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={CATEGORY_ICON_BOX}
        height={CATEGORY_ICON_BOX}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={CATEGORY_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </i>
  );
}

export function SearchIcon() {
  return (
    <FaI
      faClass="fa-solid fa-magnifying-glass"
      className="lb-icon"
      size={18}
      color="currentColor"
    />
  );
}

/** Solid star — matches reference (filled light blue / gold for 1st). */
export function StarIcon({
  variant = 'blue',
  size = 20,
}: {
  variant?: 'gold' | 'blue';
  size?: number;
}) {
  const color =
    variant === 'gold' ? 'var(--lb-gold)' : 'var(--lb-star-blue)';
  return <FaI faClass="fa-solid fa-star" size={size} color={color} />;
}

export function TrophyIcon() {
  return (
    <FaI
      faClass="fa-solid fa-trophy"
      size={22}
      color="var(--lb-trophy-stroke)"
    />
  );
}

/** Education — Lucide `graduation-cap` (outline). */
export function IconEducation() {
  return (
    <CategoryOutlineIcon>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </CategoryOutlineIcon>
  );
}

/** Public speaking — Lucide `presentation` (outline). */
export function IconPublicSpeaking() {
  return (
    <CategoryOutlineIcon>
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </CategoryOutlineIcon>
  );
}

/** University Partnership — Lucide `smile` (outline). */
export function IconUniversityPartnership() {
  return (
    <CategoryOutlineIcon>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </CategoryOutlineIcon>
  );
}

const CATEGORY_ICONS: Record<CategoryId, () => ReactElement> = {
  Education: IconEducation,
  PublicSpeaking: IconPublicSpeaking,
  UniversityPartnership: IconUniversityPartnership,
};

export function categoryIcon(c: CategoryId) {
  const Icon = CATEGORY_ICONS[c];
  return <Icon />;
}

const ACCORDION_CHEVRON_BOX = 20;
const ACCORDION_CHEVRON_STROKE = 1.75;

/**
 * Single Lucide-style chevron (stroke); points down when collapsed.
 * Parent `.lb-row__expbtn` applies default / hover / opened visuals; rotation uses `--open` in CSS.
 */
export function AccordionChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <i
      className={`lb-fa-icon lb-accordion-chevron ${expanded ? 'lb-accordion-chevron--open' : ''}`.trim()}
      aria-hidden
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={ACCORDION_CHEVRON_BOX}
        height={ACCORDION_CHEVRON_BOX}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={ACCORDION_CHEVRON_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </i>
  );
}
