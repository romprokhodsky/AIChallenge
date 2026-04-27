import type { Activity, CategoryId, Person } from '../types';

/** Seeded PRNG for stable demo data across page loads. */
function mulberry32(seed: number) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rnd = mulberry32(0x1ead_beef);
const pick = <T,>(a: T[]) => a[Math.floor(rnd() * a.length)]!;
const ri = (min: number, max: number) =>
  min + Math.floor(rnd() * (max - min + 1));

const PRE = ['[EDU]', '[REG]', '[MKT]', '[R&D]'] as const;
const EDU = [
  'Open Source Day Workshop',
  'Github Copilot Masterclass',
  'Security Awareness Deep Dive',
  'Cloud Fundamentals',
  'Design Systems Lab',
] as const;
const REG = [
  'Engineering All-hands',
  'Offline Community Meetup',
  'Lunch & Learn: Testing',
] as const;

const cats: CategoryId[] = [
  'Education',
  'PublicSpeaking',
  'UniversityPartners',
];
const TITLES = [
  'Senior Software Engineer',
  'Group Manager',
  'Lead QA Engineer',
  'Principal Developer',
  'Scrum Master',
  'Data Analyst',
  'UX Designer',
] as const;
const GROUPS = [
  'Alpha Squad',
  'Core Platform',
  'Experience Lab',
  'Data Studio',
] as const;

const FIRST: string[] = [
  'James', 'Emma', 'Lukas', 'Sofia', 'Marcus', 'Elena', 'Nils', 'Anna',
  'Karl', 'Olga', 'Thomas', 'Maria', 'Henrik', 'Irena', 'Paul', 'Laura',
] as const;

const LAST: string[] = [
  'Bergström', 'Kowalski', 'Johansson', 'Novak', 'Ivanov', 'Nowak', 'Fischer', 'Dubois',
  'Hansen', 'Keller', 'Olsen', 'Krstic', 'Blom', 'Havel', 'Meier', 'Larsen',
] as const;

// Small stock/demo avatar images; no corporate photos or personal data are used.
const AVATAR_IDS = [68, 47, 12, 32, 52, 5, 15, 44, 11, 49, 3, 29, 61, 23, 8, 41];

function makeActivity(emp: number, i: number, year: number): Activity {
  const category = pick(cats);
  const m = ri(0, 11);
  const day = ri(1, 28);
  const p =
    category === 'Education' ? 64 : category === 'PublicSpeaking' ? 32 : 8;
  const wobble = [8, 16, 32, 64, 4];
  const base = p + wobble[ri(0, wobble.length - 1)];
  const pre = pick([...PRE]);
  const name =
    pre === '[EDU]'
      ? pick([...EDU])
      : pre === '[REG]'
        ? pick([...REG])
        : 'Campus Roadshow';
  const dd = String(day).padStart(2, '0');
  const y2 = String(year).slice(2);
  return {
    id: `e${emp}-a${i}`,
    year,
    month: m,
    day,
    category,
    displayLine: `${pre} ${name} (${dd}.${String(m + 1).padStart(2, '0')}.${y2})`,
    points: base,
  };
}

const years = [2024, 2025];

function makePerson(emp: number, first: string, last: string): Person {
  const n = ri(5, 22);
  const acts: Activity[] = [];
  for (let i = 0; i < n; i++) {
    const y = pick([...years]);
    acts.push(makeActivity(emp, i, y));
  }
  return {
    id: `p${emp}`,
    firstName: first,
    lastName: last,
    jobTitle: pick([...TITLES]),
    groupName: pick([...GROUPS]),
    avatarUrl: `https://i.pravatar.cc/128?img=${AVATAR_IDS[emp % AVATAR_IDS.length]}`,
    activities: acts,
  };
}

export const PEOPLE: Person[] = FIRST.map((f, i) => makePerson(i, f, LAST[i]!));

// Ensure high variance for a compelling podium
export function getAvailableYears(people: Person[]): number[] {
  const s = new Set<number>();
  for (const p of people) {
    for (const a of p.activities) s.add(a.year);
  }
  return [...s].sort((a, b) => a - b);
}

