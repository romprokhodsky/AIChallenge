/** Contribution leaderboard categories (IDs match stable keys in data and filters). */
export type CategoryId =
  | 'Education'
  | 'PublicSpeaking'
  | 'UniversityPartnership';

/** Display order used in filters, breakdown strip, and aggregates. */
export const CATEGORY_IDS: readonly CategoryId[] = [
  'Education',
  'PublicSpeaking',
  'UniversityPartnership',
] as const;

export const CATEGORY_FILTER_OPTIONS: {
  id: CategoryId | 'All';
  label: string;
}[] = [
  { id: 'All', label: 'All Categories' },
  { id: 'Education', label: 'Education' },
  { id: 'PublicSpeaking', label: 'Public Speaking' },
  { id: 'UniversityPartnership', label: 'University Partnership' },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  Education: 'Education',
  PublicSpeaking: 'Public Speaking',
  UniversityPartnership: 'University Partnership',
};

/** Zeroed counts for each category (ranked-row breakdown). */
export function emptyCategoryBreakdown(): Record<CategoryId, number> {
  return {
    Education: 0,
    PublicSpeaking: 0,
    UniversityPartnership: 0,
  };
}

export interface Activity {
  id: string;
  year: number;
  month: number; // 0-11
  day: number; // 1-28
  category: CategoryId;
  /** Shown in ACTIVITY column, e.g. [EDU] Event name (18.12.25) */
  displayLine: string;
  points: number;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  groupName: string;
  avatarUrl: string;
  activities: Activity[];
}

export interface PersonRanked {
  person: Person;
  totalPoints: number;
  eventCount: number;
  categoryBreakdown: Record<CategoryId, number>;
  visibleActivities: Activity[];
}

export type YearFilter = 'All' | number;
export type QuarterFilter = 'All' | 'Q1' | 'Q2' | 'Q3' | 'Q4';

export function monthToQuarter(q: 'Q1' | 'Q2' | 'Q3' | 'Q4'): number {
  return { Q1: 0, Q2: 1, Q3: 2, Q4: 3 }[q] as number;
}

export function activityInQuarter(
  m: number,
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4',
): boolean {
  return Math.floor(m / 3) === monthToQuarter(quarter);
}
