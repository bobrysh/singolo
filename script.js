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
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const slideElements = document.querySelectorAll(".slide");

let currentSlide = 0;
let isEnable = true;

arrowLeft.addEventListener("click", () => {
  if (isEnable) {
    showPreviousSlide(currentSlide);
  }
});

arrowRight.addEventListener("click", () => {
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


// Screen switcher
const slideFirstElement = document.querySelector(".slide-1");

slideFirstElement.addEventListener("click", event => {
  let phoneSelectedElement = event.target.closest(".base");

  if (phoneSelectedElement) {
    changeScreenMode(phoneSelectedElement);
  }
});

function changeScreenMode(phoneSelected) {
  const screenSelectedElement = phoneSelected.querySelector(".screen");

  let currentMode;
  let newMode;

  if (screenSelectedElement.classList.contains("screen_on")) {
    currentMode = "screen_on";
    newMode = "screen_off";
  } else {
    currentMode = "screen_off";
    newMode = "screen_on";
  }

  screenSelectedElement.classList.remove(`${currentMode}`);
  screenSelectedElement.classList.add(`${newMode}`);
}