function getFirstDayInMonth(numberOfMonthsToSubtract) {
    let currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - numberOfMonthsToSubtract, 1);
}

function getLastDayInMonth(numberOfMonthsToSubtract) {
    let lastDayInMonth = getFirstDayInMonth(numberOfMonthsToSubtract - 1);
    return new Date(lastDayInMonth.getTime() - 1);
}

function getShortDate(date) {
    let month = toTwoDigit(date.getMonth() + 1);
    let day = toTwoDigit(date.getDate());
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;

    function toTwoDigit(digit) {
        return (digit < 10) ? `0${digit}` : digit;
    }
}

module.exports = {
    getFirstDayInMonth,
    getLastDayInMonth,
    getShortDate
};
