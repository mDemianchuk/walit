function getFirstDayInMonth(numberOfMonths) {
    let currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - numberOfMonths, 1);
}

function getLastDayInMonth(numberOfMonths) {
    let currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1 - numberOfMonths, 0);
}

function getShortDate(date) {
    let month = toTwoDigit(date.getMonth() + 1);
    let day = toTwoDigit(date.getDate() + 1);
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
