function getFirstDayInMonth(previous) {
    let currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - previous, 1);
}

function getLastDayInMonth(previous) {
    let currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - previous, 0);
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
