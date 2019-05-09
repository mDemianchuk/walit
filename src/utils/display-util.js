function setElementDisplayStyle(element, style) {
    element.style.display = style;
}

function displayElement(element) {
    setElementDisplayStyle(element, 'block');
}

function hideElement(element) {
    setElementDisplayStyle(element, 'none');
}

function toggleElements(element1, element2) {
    hideElement(element1);
    displayElement(element2);
}

module.exports = {
    displayElement,
    hideElement,
    toggleElements
};
