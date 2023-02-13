import Swiper from 'swiper/bundle';

const projectFilter = document.querySelector('.js-project-filter');
const slider = document.querySelector('.js-project-slider')
const projectSliderItems = [...slider.firstElementChild.children]

let swiper;

export function initProjectsSlider() {
  swiper = runSwiper('apartments');

  projectFilter.addEventListener('click', function(e) {
    const target = e.target;
    const type = target.dataset.type;

    if (!type) {
      return;
    }

    [...projectFilter.children].forEach((item) => {
      item.classList.toggle('filterButton--active', item === target);
    });

    swiper.destroy(true, true);

    swiper = runSwiper(type);
  });
}

function runSwiper(type) {
  slider.firstElementChild.innerHTML = projectSliderItems.filter((slide) => slide.dataset.type === type).map(item => item.outerHTML).join('')

  return new Swiper('.js-project-slider', {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 15,

    navigation: {
      nextEl: '.js-project-slider-next',
      prevEl: '.js-project-slider-prev',
    },
    breakpoints: {
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
    },
  });
}