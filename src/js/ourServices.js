import Swiper from "swiper/bundle";

let swiper

export function initOurServices() {
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
}

function initOfferSwiper() {
  swiper = new Swiper('.js-services-slider', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    freeMode: true,
    loop: false,
    pagination: {
      el: '.js-services-slider-bar',
      type: 'progressbar',
    },
  });
}

const breakpoint = window.matchMedia('(max-width: 980px)');

const breakpointChecker = function() {
  if (breakpoint.matches === true) {
    return initOfferSwiper();
  } else {
    swiper && swiper.destroy()
  }
};

