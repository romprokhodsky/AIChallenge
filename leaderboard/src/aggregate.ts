import type { Activity, CategoryId, Person, PersonRanked } from './types';
import {
  type QuarterFilter,
  type YearFilter,
  activityInQuarter,
  emptyCategoryBreakdown,
} from './types';
import { fullName } from './format';

function activityMatches(
  a: Activity,
  year: YearFilter,
  quarter: QuarterFilter,
  category: CategoryId | 'All',
): boolean {
  if (year !== 'All' && a.year !== year) return false;
  if (quarter !== 'All' && !activityInQuarter(a.month, quarter)) {
    return false;
  }
  if (category !== 'All' && a.category !== category) return false;
  return true;
}

function byDateDesc(a: Activity, b: Activity): number {
  if (a.year !== b.year) return b.year - a.year;
  if (a.month !== b.month) return b.month - a.month;
  return b.day - a.day;
}

function sortStableByName(
  a: PersonRanked,
  b: PersonRanked,
): number {
  const aN = fullName(a.person);
  const bN = fullName(b.person);
  if (a.totalPoints !== b.totalPoints) {
    return b.totalPoints - a.totalPoints;
  }
  return aN.localeCompare(bN);
}

export function nameSearchMatches(
  p: Person,
  query: string,
): boolean {
  const s = query.trim().toLowerCase();
  if (!s) return true;
  const f = p.firstName.toLowerCase();
  const l = p.lastName.toLowerCase();
  return f.includes(s) || l.includes(s) || `${f} ${l}`.includes(s);
}

export function buildRanked(
  people: Person[],
  year: YearFilter,
  quarter: QuarterFilter,
  category: CategoryId | 'All',
  search: string,
): PersonRanked[] {
  const out: PersonRanked[] = [];
  for (const person of people) {
    if (!nameSearchMatches(person, search)) continue;
    const visible = person.activities.filter((a) =>
      activityMatches(a, year, quarter, category),
    );
    if (visible.length === 0) continue;
    const totalPoints = visible.reduce((s, a) => s + a.points, 0);
    const categoryBreakdown = emptyCategoryBreakdown();
    for (const a of visible) {
      categoryBreakdown[a.category] += 1;
    }
    out.push({
      person,
      totalPoints,
      eventCount: visible.length,
      categoryBreakdown,
      visibleActivities: [...visible].sort(byDateDesc),
    });
  }
  return out.sort(sortStableByName);
}
