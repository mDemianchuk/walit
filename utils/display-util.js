function displayElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
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
