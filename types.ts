export enum DayStatus {
  Pending = 'pending',
  Done = 'done',
  Missed = 'missed',
}

export type TrackedDays = Record<string, DayStatus>;

export interface Habit {
  id: number;
  created_at: string;
  name: string;
  time: string;
  tracked_days: TrackedDays;
  start_date: string; // YYYY-MM-DD
}
