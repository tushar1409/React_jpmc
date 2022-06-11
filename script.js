'use strict';

//VARIABLES FOR SELECTORS

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////////

//IMPLEMENTING SMOOTH SCROLLING FOR LEARN MORE BUTTON

btnScrollTo.addEventListener('click', function () {
  //SHIFTING TO SECTION1 ON CLICK
  section1.scrollIntoView({ behavior: 'smooth' });
});

//IMPLEMENTING  SCROLLING FOR HEADER BUTTONS USING EVENTS DELEGATION

//STEPS

//1. ADDING EVENT LISTENER TO COMMON PARENT ELEMENT(HEADER ELEMENT IN THIS CASE)

//2.DETERMINE WHAT ELEMENT ORIGINATED THE EVENT
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //MATCHING FOR 3 BUTTONS SO THAT EMPTY SPACE CLICK DOESNT AFFECT THE FUNCTIONALITY

  //e.target SHOWS THE ACTUAL LOCATION OF ELEMENT THAT WAS CLICKED
  if (e.target.classList.contains('nav__link')) {
    console.log('PROPER CLICK');

    e.preventDefault(); //TO PREVENT SCROLLING DUE TO ANCHOR ELEMENTS in HTML

    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//CREATING TABBED COMPONENTS FOR THE OPERATIONS MENU

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabs.forEach(function (e) {
  e.addEventListener('click', function (t) {
    console.log('TAB CLICK');

    const clicked = t.target.getAttribute('data-tab');
    console.log(clicked);

    //REMOVING ALREADY EXISTING TAB CONTENT AREA BEFORE A CLICK TO ONLY SHOW THE CURRENT TAB THAT IS CLICKED
    e.classList.remove('operations__tab--active');
    tabsContent.forEach(function (c) {
      c.classList.remove('operations__content--active');
    });

    //ACTIVATING CONTENT AREA BASED ON THE TAB CLICKED

    document
      .querySelector(`.operations__content--${clicked}`)
      .classList.add('operations__content--active');
  });
});

//FADE-OUT HOVERING EFFECT ANIMATION ON HEADER MENU OPTIONS

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

//TO UNDO MOUSEIVER HOVERING FADE EFFECT ON TAKING THE MOUSE POINTER OUT OF THE REGION
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

//IMPLEMENTING STICKY NAVIGATION

let initialCoords = section1.getBoundingClientRect(); //RETURNS THE ENTIRE GEOMETRY OF THE ELEMENTS IN REFERENCE TO THE WEB BROWSER

console.log(initialCoords);
window.addEventListener('scroll', function () {
  //SCROLLY RETURNS THE POSITION OF THE WEBPAGE DISPLAYED ON THE SCREEN FROM THE VERY TOP OF THE PAGE

  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

//IMPLEMENTING SCROLL UP REVEAL ANIMATIONS FOR EACH SECTION USING INTERSECTION OBSERVER API
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//LAZY LOADING IMAGES USING INTERSECTION OBSERVER API

const imgTargets = document.querySelectorAll('img[data-src]'); //SELECTING ONLY THOSE IMAGE ELENENTS THAT HAVE DATA-SRC ATTRIBUTES

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //REPLACING SRC WITH DATA-SRC IN CASE ENTRY IS INTERSECTING

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img)); //ALLOWS IMAGE OBSERVER TO OBSERVE EACH IMAGE

//IMPLEMENTING SLIDER COMPONENT
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currSlide = 0;
const maxSlide = slides.length;

slides.forEach(function (s, i) {
  s.style.transform = `translateX(${100 * i}%)`;
}); //THIS USES TRANSLATEX PROPERTY TO PUT ALL THE SLIDER CONTENTS NEXT TO EACH OTHER HORIZONTALLY. NEGATIVE PERCENTAGE MEANS TOWARDS LEFT ND POSITIVE MEANS RIGHT.
//1OO *i IS USED COZ EACH SLIDE TAKES 100% WIDTH SO FIRST SLIDE WILL BE 0%.NEXT WILL BE 100%,200%,....

//GOING TO NEXT SLIDE
btnRight.addEventListener('click', function () {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - currSlide)}%)`) //ON CLICKING NEXT WE WANT THE CURRENT SLIDE TO BECOME -100% SO THAT ITS HIFTS TO LEFT THATS WHY WE'RE SUBTRACTING WITH CURRENTSLIDE
  );
});

//MOVING BACK IN SLIDE

btnLeft.addEventListener('click', function () {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - currSlide)}%)`)
  );
});
