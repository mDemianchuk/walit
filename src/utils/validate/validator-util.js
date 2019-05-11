function isValidDate(date) {
    return !isNaN(date.getDate())
}

function isValidNumber(number) {
    return number && !isNaN(number);
}

function isValidString(string) {
    return string
}

module.exports = {
    isValidDate,
    isValidNumber,
    isValidString
}