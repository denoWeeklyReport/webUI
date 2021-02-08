export const getymd = () => {
    const date = new Date();
    const y = date.getFullYear(); //获取完整的年份(4位)
    const m = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    const d = date.getDate(); //获取当前日(1-31)
    return {
        y, m, d
    }
}

const isLeapYear = (year: number): boolean => {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
const getMonthDays = (year: number, month: number): number => {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

export const getWeekNumber = (y: number, m: number, d: number): number => {
    const targetDay = new Date(y, m - 1, d);
    const year = targetDay.getFullYear();
    const month = targetDay.getMonth();
    let days = targetDay.getDate();
    //那一天是那一年中的第多少天
    for (var i = 1; i < m; i++) {
        days += getMonthDays(year, i);
    }
    //那一年第一天是星期几
    const yearFirstDay = new Date(year, 0, 1).getDay();
    //计算是第几周
    days += yearFirstDay;
    const week = Math.ceil(days / 7);
    return week;
}

export const getformto = (year: number, week: number): any[] => {
    const arr = [];
    for (var m = 1; m <= 12; m++) {
        const days = getMonthDays(year, m);
        console.log(days);
        for (var d = 1; d <= days; d++) {
            const w = getWeekNumber(year, m, d);
            if (w == week) {
                arr.push({
                    y: year,
                    m: m,
                    d: d
                })
            }
        }
    }
    return arr;
}

export const getrange = (year: number, week: number) => {
    const arr = getformto(year, week);
    const weekfrom = arr[0];
    const weekto = arr[arr.length - 1];
    const from = `${weekfrom.y}-${weekfrom.m < 10 ? '0' + weekfrom.m : weekfrom.m}-${weekfrom.d < 10 ? '0' + weekfrom.d : weekfrom.d}`;
    const to = `${weekto.y}-${weekto.m < 10 ? '0' + weekto.m : weekto.m}-${weekto.d < 10 ? '0' + weekto.d : weekto.d}`;
    return {
        from: from,
        to: to
    }
}
// const { y, m, d } = getymd();
// console.log(getformto(2021, 6));
// console.log(getWeekNumber(2021, 2, 3));