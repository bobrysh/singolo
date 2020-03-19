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

// Slider
const arrowLeftElement = document.querySelector(".arrow-left");
const arrowRightElement = document.querySelector(".arrow-right");
const slideElements = document.querySelectorAll(".slide");

let currentSlide = 0;
let isEnable = true;

arrowLeftElement.addEventListener("click", () => {
  if (isEnable) {
    showPreviousSlide(currentSlide);
  }
});

arrowRightElement.addEventListener("click", () => {
  if (isEnable) {
    showNextSlide(currentSlide);
  }
});

function showPreviousSlide(currentSlide) {
  hideSlide("to-right");
  changeCurrentSlide(currentSlide - 1);
  showSlide("from-left");
}

function showNextSlide(currentSlide) {
  hideSlide("to-left");
  changeCurrentSlide(currentSlide + 1);
  showSlide("from-right");
}

function hideSlide(direction) {
  isEnable = false;
  slideElements[currentSlide].classList.add(direction);
  slideElements[currentSlide].addEventListener("animationend", function() {
    this.classList.remove("slide_active", direction);
  });
}

function changeCurrentSlide(newSlide) {
  currentSlide = (slideElements.length + newSlide) % slideElements.length;
}

function showSlide(direction) {
  slideElements[currentSlide].classList.add("next-slide", direction);
  slideElements[currentSlide].addEventListener("animationend", function() {
    this.classList.remove("next-slide", direction);
    this.classList.add("slide_active");
    isEnable = true;
  });
}