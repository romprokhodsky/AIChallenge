import type { CategoryId, PersonRanked } from '../types';
import { CATEGORY_LABEL } from '../types';
import { categoryIcon } from '../icons';

const ORDER: CategoryId[] = [
  'Education',
  'PublicSpeaking',
  'UniversityPartners',
];

type Props = { row: PersonRanked };

export function CategoryStrip({ row, compact = false }: Props & { compact?: boolean }) {
  return (
    <div className={`lb-catstrip ${compact ? 'lb-catstrip--compact' : ''}`}>
      {ORDER.map((c) => {
        const n = row.categoryBreakdown[c];
        if (n === 0) return null;
        const label = CATEGORY_LABEL[c];
        return (
          <div
            key={c}
            className="lb-catstrip__item"
            data-tip={label}
            aria-label={label}
          >
            <div className="lb-catstrip__icon">{categoryIcon(c, compact ? 18 : 28)}</div>
            <div className="lb-catstrip__num">{n}</div>
          </div>
        );
      })}
    </div>
  );
}

export function categoryPillLabel(c: CategoryId) {
  return CATEGORY_LABEL[c];
}
