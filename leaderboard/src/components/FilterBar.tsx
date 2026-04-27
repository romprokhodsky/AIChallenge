import type { CategoryId, QuarterFilter } from '../types';
import { CATEGORY_FILTER_OPTIONS } from '../types';
import { SearchIcon } from '../icons';

type Props = {
  years: number[];
  year: number | 'All';
  onYear: (v: number | 'All') => void;
  quarter: QuarterFilter;
  onQuarter: (v: QuarterFilter) => void;
  category: CategoryId | 'All';
  onCategory: (v: CategoryId | 'All') => void;
  search: string;
  onSearch: (v: string) => void;
};

const sel = 'lb-select' as const;

export function FilterBar({
  years,
  year,
  onYear,
  quarter,
  onQuarter,
  category,
  onCategory,
  search,
  onSearch,
}: Props) {
  return (
    <div className="lb-filterbar">
      <div className="lb-filterbar__inner">
        <select
          className={sel}
          value={year === 'All' ? 'All' : String(year)}
          onChange={(e) => {
            const v = e.target.value;
            onYear(v === 'All' ? 'All' : Number(v));
          }}
          aria-label="Year"
        >
          <option value="All">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          className={sel}
          value={quarter}
          onChange={(e) => onQuarter(e.target.value as QuarterFilter)}
          aria-label="Quarter"
        >
          <option value="All">All Quarters</option>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>
        <select
          className={sel}
          value={category}
          onChange={(e) =>
            onCategory(e.target.value as CategoryId | 'All')
          }
          aria-label="Category"
        >
          {CATEGORY_FILTER_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="lb-search">
          <SearchIcon />
          <input
            type="search"
            className="lb-search__input"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
