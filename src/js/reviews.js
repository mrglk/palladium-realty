import Swiper from "swiper/bundle";

const swiperElement = document.querySelector('.js-reviews-slider')

export function initReviews() {
  const swiper = new Swiper('.js-reviews-slider', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    // freeMode: true,
    loop: true,
    autoplay: {
      // delay: 1,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    speed: 1000,
    simulateTouch: false,
    mousewheel: false,
    pagination: {
      el: ".js-reviews-slider-progress",
      type: "progressbar",
    },
  })
}