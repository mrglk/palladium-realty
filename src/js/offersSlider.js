import Swiper from "swiper/bundle";

let swiper

export function initOfferSlider() {
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
}

function initOfferSwiper() {
  swiper = new Swiper('.js-offer-slider', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    freeMode: true,
    loop: false,
    pagination: {
      el: ".js-offer-slider-bar",
      type: "progressbar",
    },
  });
}

const breakpoint = window.matchMedia("(max-width: 980px)");

const breakpointChecker = function () {
  if (breakpoint.matches === true) {
    return initOfferSwiper();
  } else {
    swiper && swiper.destroy()
  }
};
