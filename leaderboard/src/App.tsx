import { useMemo, useState } from 'react';
import type { CategoryId } from './types';
import type { QuarterFilter, YearFilter } from './types';
import { getAvailableYears, PEOPLE } from './data/fakeData';
import { buildRanked } from './aggregate';
import { FilterBar } from './components/FilterBar';
import { Podium } from './components/Podium';
import { LeaderRow } from './components/LeaderRow';
import './App.css';

const YEARS = getAvailableYears(PEOPLE);

export default function App() {
  const [year, setYear] = useState<YearFilter>('All');
  const [quarter, setQuarter] = useState<QuarterFilter>('All');
  const [category, setCategory] = useState<CategoryId | 'All'>('All');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const ranked = useMemo(
    () => buildRanked(PEOPLE, year, quarter, category, search),
    [year, quarter, category, search],
  );
  const top3 = useMemo(() => ranked.slice(0, 3), [ranked]);

  function toggleRow(id: string) {
    setExpandedId((cur) => (cur === id ? null : id));
  }

  return (
    <div className="lb-page">
      <header className="lb-header">
        <h1 className="lb-title">Leaderboard</h1>
        <p className="lb-sub">
          Top performers based on contributions and activity
        </p>
      </header>

      <FilterBar
        years={YEARS}
        year={year}
        onYear={setYear}
        quarter={quarter}
        onQuarter={setQuarter}
        category={category}
        onCategory={setCategory}
        search={search}
        onSearch={setSearch}
      />

      <section className="lb-section lb-section--podium" aria-label="Top three">
        <Podium top3={top3} />
      </section>

      <section className="lb-section" aria-label="Full leaderboard">
        {ranked.length === 0 ? (
          <p className="lb-noresult">
            No employees match the current filters. Try &quot;All
            Years&quot; and clear the search to see the sample data.
          </p>
        ) : (
          ranked.map((row, i) => {
            const rank = i + 1;
            return (
              <LeaderRow
                key={row.person.id}
                row={row}
                rank={rank}
                expanded={expandedId === row.person.id}
                onToggle={() => toggleRow(row.person.id)}
              />
            );
          })
        )}
      </section>
    </div>
  );
}
