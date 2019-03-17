function getNumberOfDaysInCurrentMonth() {
    return new Date().getDate();
}

function getNumberOfDaysInPreviousMonth() {
    let currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate();
}

module.exports = {
    getNumberOfDaysInCurrentMonth,
    getNumberOfDaysInPreviousMonth
};