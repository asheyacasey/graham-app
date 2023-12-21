import moment from 'moment'
export function calculateHoursDifference(startDate: Date, endDate: Date): number {
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate);

    const hourDifference = momentEndDate.diff(momentStartDate, 'hours');
    return hourDifference;
}

export function calculateMonthsDifference(startDate: Date, endDate: Date): number {
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate);

    const hourDifference = momentEndDate.diff(momentStartDate, 'months');
    return hourDifference;
}

export function calculateDaysDifference(startDate: Date, endDate: Date): number {
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate);

    const hourDifference = momentEndDate.diff(momentStartDate, 'days');
    return hourDifference;
}
export function calculateYearsDifference(startDate: Date, endDate: Date): number {
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate);

    const hourDifference = momentEndDate.diff(momentStartDate, 'years');
    return hourDifference;
}

export function calculateWeeksDifference(startDate: Date, endDate: Date): number {
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate);

    const hourDifference = momentEndDate.diff(momentStartDate, 'weeks');
    return hourDifference;
}

