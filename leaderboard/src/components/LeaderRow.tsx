import type { PersonRanked } from '../types';
import { fullName } from '../format';
import { StarIcon, ChevronDown, ChevronUp } from '../icons';
import { CategoryStrip } from './CategoryStrip';
import { ActivityTable } from './ActivityTable';

type Props = {
  row: PersonRanked;
  rank: number;
  expanded: boolean;
  onToggle: () => void;
};

export function LeaderRow({
  row,
  rank,
  expanded,
  onToggle,
}: Props) {
  const p = row.person;
  const name = fullName(p);
  const sub = `${p.jobTitle} (${p.groupName})`;
  return (
    <div className={`lb-row ${expanded ? 'lb-row--open' : ''}`}>
      <div className="lb-row__head">
        <div className="lb-row__rank">{rank}</div>
        <div className="lb-row__avatar">
          <img className="lb-row__avatar-img" src={p.avatarUrl} alt="" />
        </div>
        <div className="lb-row__text">
          <div className="lb-row__name">{name}</div>
          <div className="lb-row__sub">{sub}</div>
        </div>
        <div className="lb-row__meta">
          <CategoryStrip row={row} compact />
          <div className="lb-row__meta-divider" />
          <div className="lb-row__total">
            <div className="lb-row__totlab">TOTAL</div>
            <div className="lb-row__totval lb-row__totval--big">
              <StarIcon variant="blue" size={28} />
              <span>{row.totalPoints}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="lb-row__expbtn"
          onClick={onToggle}
          aria-expanded={expanded}
        >
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      {expanded && (
        <div className="lb-row__body">
          <ActivityTable row={row} />
        </div>
      )}
    </div>
  );
}
