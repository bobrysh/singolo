const NAVIGATION = document.getElementById('navigation');
const BUTTON_SUBMIT = document.getElementById('submit-button');
const PORTFOLIO_PICT = document.getElementById('portfolio-pictures');
const PORTFOLIO_FILTER = document.getElementById('portfolio_buttons');
const PHONE_hori_SCREEN = document.getElementById('iphone-hori');
const BUTTON_OK = document.getElementById('popup-close-btn');
const PHONE_verti_SCREEN = document.getElementById('iphone-verti');
const SHORT_MENU = document.getElementById('menu-icon');
var firstSliderItem = true;
var sliderAnimationEnd = true;
var firstOffset;
var secondOffset;
var pictures = document.querySelectorAll('.portfolio__image-item');
var newArr = shuffle(Array.from(pictures));

// SLIDER
document.querySelector('.slider__arrow_left').addEventListener('click', () => slider());
document.querySelector('.slider__arrow_right').addEventListener('click', () => slider(false));

function slider(leftArrow = true) {
    if (sliderAnimationEnd) {
        sliderAnimationEnd = !sliderAnimationEnd;

        const currentPicture = firstSliderItem ? 'slide-1' : 'slide-2';
        const nextPicture = firstSliderItem ? 'slide-2' : 'slide-1';
        const nextSlide = document.getElementsByClassName(nextPicture)[0];
        const currentSlide = document.getElementsByClassName(currentPicture)[0];
        const background = document.getElementsByClassName('slider__wrapper')[0];
        

        switch (leftArrow) {
          case true:
            firstOffset = 'slider_right-offset';
            secondOffset = 'slider_left-offset';
            break;
        
          default: false
          secondOffset = 'slider_right-offset';
          firstOffset = 'slider_left-offset';
            break;
        }

        nextSlide.classList.add(secondOffset);
        nextSlide.addEventListener("transitionend",() => {
                nextSlide.classList.remove('hidden_opacity');
                nextSlide.classList.remove(secondOffset);}, {once: true});
        currentSlide.classList.add(firstOffset);

        background.classList.toggle('second-slide');
        firstSliderItem = !firstSliderItem;

        currentSlide.addEventListener("transitionend",() => {
                currentSlide.classList.add('hidden_opacity');
                nextSlide.style.zIndex = '100';
                currentSlide.style.zIndex = '1';
                currentSlide.classList.remove(firstOffset);
                sliderAnimationEnd = !sliderAnimationEnd;
            }, {once: true});
    }
}

//IPHONE BREAK
PHONE_hori_SCREEN.addEventListener('click', (event) => {
  if (event.target.id === 'iphone-hori-shadow') return;
  document.getElementById('iphone-hori-screen').classList.toggle('screen_off');
});

PHONE_verti_SCREEN.addEventListener('click', (event) => {
  if (event.target.id === 'iphone-verti-shadow') return;
  document.getElementById('iphone-verti-screen').classList.toggle('screen_off');
});

  //PORTFOLIO SHUFFLE
  PORTFOLIO_FILTER.addEventListener('click', (event) => {
      if (event.target.tagName !== 'LI') return;
      PORTFOLIO_FILTER.querySelectorAll('li')
          .forEach(el => el.classList.remove('portfolio__button-item_active'));
      event.target.classList.add('portfolio__button-item_active');
      printPortfolio();
  });

  PORTFOLIO_PICT.addEventListener('click', (event) => {
      PORTFOLIO_PICT.querySelectorAll('li').forEach(element => element.classList.remove('portfolio__image-item_active'));
      event.target.parentNode.classList.add('portfolio__image-item_active');
  });

  function printPortfolio() {

      document.getElementById('portfolio-pictures').innerHTML = newArr.reduce((acc, event) => typeof acc === 'string' ? acc + event.outerHTML : acc.outerHTML + event.outerHTML);
  }

  function shuffle(arr) {
      var consta, keys;
      arr.forEach(element => {
        consta = Math.floor(Math.random() * (element + 1));
        keys = arr[element];
        arr[element] = keys; 
        arr[element] = arr[element];
      });
      return arr;
  }

// SHORT MENU
SHORT_MENU.addEventListener('click', (event) => {
  openShortMenu (event);
});

function openShortMenu (event) {
  document.querySelector('.header-wrapper').classList.toggle('header__wrapper-close');
  event.target.classList.add('menu-icon_active');
  event.target.classList.remove('menu-icon_active');
}

function closeShortMenu (event) {
document.querySelector('.header-wrapper').classList.add('header__wrapper-close');
document.querySelector('.material-icons').classList.remove('menu-icon_active');
}

function slideToAnchor(event) {
  const currentPos = window.scrollY;
  const articles = document.querySelectorAll('main>article');

  articles.forEach((element) => {
      switch (currentPos + 95 >= element.offsetTop && currentPos + 95 < (element.offsetTop + element.offsetHeight)) {
        case true:
          NAVIGATION.querySelectorAll('a').forEach((el) => {
            el.classList.remove('navigation__item_active');
            closeShortMenu(event);
            switch (element.getAttribute('class') === el.getAttribute('href').substring(1)) {
              case true:
                el.classList.add('navigation__item_active');
                break;
            
              default:
                break;
            }
        })
          break;
      
        default:
          break;
      }
  });
}
window.addEventListener('scroll', slideToAnchor);

//SUBMIT FORM
BUTTON_SUBMIT.addEventListener('click', (event) => {
  if (document.querySelector('.form-quote').checkValidity()) {
      event.preventDefault();
      document.getElementById('quote-popup-block').classList.remove('hidden');
      document.getElementById('result').innerText = messageText;
      var messageText = getSubjectInput();
      messageText += getDescriptionInput();
      document.querySelector('.form-quote').reset();
  }
});

function getSubjectInput() {
  const subject = document.getElementById('subject').value;
  switch (subject) {
    case true:
      `Описание: ${sliced}`
      return;
  
    default:
      'Без описания'
      return;
  }
}

function getDescriptionInput() {
  const description = document.getElementById('description').value;
  switch (description) {
    case true:
      `Описание: ${sliced}`
      return;
  
    default:
      'Без описания'
      return;
  }
}


BUTTON_OK.addEventListener('click', () => {
  document.getElementById('quote-popup-block').classList.add('hidden');
});
