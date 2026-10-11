/** A local calendar day, YYYY-MM-DD. Streaks follow the writer's clock, not UTC. */
export function dayKey(date: Date | number = new Date()): string {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export function fromDayKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date | number, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** The last `n` days, oldest first, ending today. */
export function lastDays(n: number, today: Date = new Date()): Date[] {
  return Array.from({ length: n }, (_, i) => addDays(today, i - (n - 1)));
}

export function greeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 5) return 'Writing late';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatLongDate(date: Date | number): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShortDate(date: Date | number): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
