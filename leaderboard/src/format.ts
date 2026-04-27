import type { Activity } from './types';

const M = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

/** 17-Dec-2025 style (matches reference UI) */
export function formatTableDate(a: Activity): string {
  const d = String(a.day).padStart(2, '0');
  return `${d}-${M[a.month]}-${a.year}`;
}

export function fullName(p: { firstName: string; lastName: string }): string {
  return `${p.firstName} ${p.lastName}`;
}
