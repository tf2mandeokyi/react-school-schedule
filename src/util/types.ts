// Table related interfaces & types
export interface Subject {
    name?: string;
    shortName?: string;
    links: string[];
    displayArgs?: (string[] | null)[];
}

export interface HyperlinkButton {
    display: string;
    color: string;

    customDisplay?: string;

    noLinkDisplay: string;
    noLinkColor: string;
}

export type TableData = (string[] | null)[];

export interface TimeLengthInfo {
    morningStart: number;
    morningEnd: number;
    classStart: number;
    classDuration: number;
    breakDuration: number;
    lunchIndex: number;
    lunchDuration: number;
}

export interface ScheduleData {
    buttons: HyperlinkButton[];
    subjects: { [x: string]: Subject; };
    schedule: TableData;
    timeLengthInfo: TimeLengthInfo;
}

export interface TablePosition {
    dotw: number;
    y: number;
}