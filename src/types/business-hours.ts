export interface DaySchedule {
  open?: string;
  close?: string;
  closed?: boolean;
}

export interface BusinessHours {
  [key: string]: DaySchedule;
}
