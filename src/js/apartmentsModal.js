import { openModal } from './initModals';
import { apartmensData } from './data/apartments';
import Swiper from "swiper/bundle";
import { getPageLang } from './utils/helpers';

const apartmentsSlider = document.querySelector('.js-project-slider')

const apartId = document.querySelector('.js-apartment-data-id')
const apartSlider = document.querySelector('.js-apartment-data-slider')
const apartThumbs = document.querySelector('.js-apartment-data-thumbs')
const apartPrice = document.querySelector('.js-apartment-data-price')
const apartTitle = document.querySelector('.js-apartment-data-title')
const apartAddress = document.querySelector('.js-apartment-data-address')
const apartDescription = document.querySelector('.js-apartment-data-description')
const apartType = document.querySelector('.js-apartment-data-type')
// const apartAge = document.querySelector('.js-apartment-data-age')
const apartSize = document.querySelector('.js-apartment-data-size')
const apartBathrooms = document.querySelector('.js-apartment-data-bathrooms')
const apartBedrooms = document.querySelector('.js-apartment-data-bedrooms')
// const apartFileSize = document.querySelector('.js-apartment-data-brochure-filesize')
// const apartFileUrl = document.querySelector('.js-apartment-data-brochure')

export function initApartmentsModal() {
  apartmentsSlider.addEventListener('click', function(e) {
    const link = e.target.closest('.js-open-apartment-modal')

    if (!link) {
      return
    }

    const id = link.dataset.id

    if (!id) {
      return;
    }

    const lang = getPageLang()
    const data = apartmensData[lang].find((item) => Number(item.id) === Number(id))


    apartId.innerText = data.id
    // apartFileSize.innerText = data.filesize || '200 KB'
    apartBedrooms.innerText = data.bedrooms
    apartSize.innerText = data.size
    apartAddress.innerText = data.name
    apartDescription.innerHTML= data.description
    apartTitle.innerText = data.title
    apartType.innerText = data.type
    apartPrice.innerText = data.price
    // apartAge.innerText = data.age
    apartBathrooms.innerText = data.bathrooms
    // apartFileUrl.setAttribute('href', data.brochure)

    apartThumbs.firstElementChild.innerHTML = (data.photos || []).map((photo) => {
      return `<div class="apartmentData__sliderPhoto swiper-slide"><img alt="Apartaments" src="${photo}"></div>`
    }).join('')

    apartSlider.firstElementChild.innerHTML = (data.photos || []).map((photo) => {
      return `<div class="swiper-slide apartmentData__photoItem"><img alt="Apartaments" src="${photo}" /></div>`
    })

    openModal('apartmentData')

    const thumbsSlider = new Swiper('.js-apartment-data-thumbs', {
      loop: true,
      slidesPerView: 'auto',
      on: {
        slideChange: () => {}
      },
      centeredSlides: true,
      watchSlidesProgress: true,
    })

    const mainSlider = new Swiper('.js-apartment-data-slider', {
      effect: 'fade',
      loop: true,
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 1,
      autoHeight: true,
      on: {
        slideChange: () => {}
      },
      thumbs: {
        swiper: thumbsSlider
      },
      navigation: {
        nextEl: '.js-apartment-next',
        prevEl: '.js-apartment-prev',
      },
    })
  })
}