// Table related interfaces & types
export interface Subject {
    name?: string;
    short_name?: string;
    links: string[];
}

export type TableData = string[][];

export interface TimeLengthInfo {
    morning_start: number;                  // => morningStart
    morning_end: number;                    // => morningEnd
    start: number;                          // => classStart
    class: number;                          // => classDuration
    break: number;                          // => breakDuration
    lunch_time_index: number;               // => lunchIndex
    lunch: number;                          // => lunchDuration
}

export interface ScheduleData {
    subjects: { [x: string]: Subject; }
    schedule: TableData;
    time_length: TimeLengthInfo;            // => timeInfo
}

export interface TablePosition {
    dotw: number;
    y: number;
}