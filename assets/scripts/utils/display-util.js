function displayElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
}

function toggleElement(element) {
  if (element.style.display === 'block') {
    hideElement(element);
  } else if (element.style.display === 'none') {
    displayElement(element);
  }
}

module.exports = {
  displayElement,
  hideElement,
  toggleElement
};
