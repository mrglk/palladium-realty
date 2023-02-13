import Swiper from "swiper/bundle";

const nextListMobile = document.querySelectorAll('.js-experts-next-mobile')
const nextList = document.querySelectorAll('.js-experts-next')
const nextExpertButton = [...document.querySelectorAll('.js-next-expert-button')]

export function initExpertSlider() {
  if (!nextList || !nextExpertButton) {
    return
  }

  const swiper = new Swiper('.js-experts-slider', {
    effect: 'fade',
    loop: true,
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    on: {
      slideChange
    }
  })

  nextExpertButton.forEach((button) => {
    button.addEventListener('click', function(e) {
      e.preventDefault()
      swiper.slideTo(swiper.realIndex + 2)
    })
  })
}

const slideChange = (swiper) => {
  const currentIndex = swiper.realIndex

  for (let i = 0; i < nextList.length; i++) {
    nextListMobile[i].classList.toggle('experts__view--active', i === currentIndex)
    nextList[i].classList.toggle('experts__view--active', i === currentIndex)
  }
}