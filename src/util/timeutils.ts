import { ScheduleData } from "./types";


export function getHourMinute(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
}


export function getIndexFromHM(data: ScheduleData, currentHM: number) {
    let { classDuration, breakDuration, lunchDuration, lunchIndex, classStart } = data.timeLengthInfo;

    let hmSinceStart = currentHM - classStart;
    let lunchStart = lunchIndex * (classDuration + breakDuration);
    let index = Math.floor(
        (hmSinceStart < (lunchStart + lunchDuration) ? 
            hmSinceStart : 
            hmSinceStart - lunchDuration
        ) / (classDuration + breakDuration)
    );
    return index;
}


export function getIndexFromTime(data: ScheduleData, now = new Date()) {
    return getIndexFromHM(data, getHourMinute(now));
}


export function getClassStartingTime(data: ScheduleData, index: number) {
    let { classDuration, breakDuration, lunchDuration, lunchIndex, classStart } = data.timeLengthInfo;

    return classStart + breakDuration + (classDuration + breakDuration) * index +
        (index >= lunchIndex ? lunchDuration : 0);
}