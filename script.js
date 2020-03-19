// Navigation
const navigationElement = document.querySelector(".navigation");

navigationElement.addEventListener("click", event => {
  changeSection("navigation__item", "navigation__item_active", event);
});

function changeSection(elementsClass, activeClass, event) {
  if (event.target.classList.contains(`${elementsClass}`)) {
    const elements = document.querySelectorAll(`.${elementsClass}`);
    elements.forEach(element => {
      element.classList.remove(`${activeClass}`);
    });
    event.target.closest(`.${elementsClass}`).classList.add(`${activeClass}`);
  }
}