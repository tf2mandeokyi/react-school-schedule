import { ScheduleData } from "./types";


export function getHourMinute(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
}


export function getCurrentTimeInformation(data: ScheduleData, now = new Date()) {
    return {
        index: getIndexFromTime(data, now),
        dotw: now.getDay(),
        hourMinute: getHourMinute(now)
    }
}


export function getIndexFromTime(data: ScheduleData, now = new Date()) {
    let { break: breakLength, class: classLength, lunch, lunch_time_index, start } = data.time_length;

    let currentHM = getHourMinute(now) - start;
    let lunchStart = lunch_time_index * (classLength + breakLength);
    let index = Math.floor(
        (currentHM < (lunchStart + lunch) ? 
            currentHM : 
            currentHM - lunch) / (classLength + breakLength)
    );
    return index;
}


export function getClassStartingTime(data: ScheduleData, index: number) {
    let { break: breakLength, class: classLength, lunch, lunch_time_index, start } = data.time_length;

    return start + breakLength + (classLength + breakLength) * index +
        (index >= lunch_time_index ? lunch : 0);
}