import "./css/style.css";
import 'swiper/css/bundle';
import { customSelect } from "./js/customSelect";
import { initModals } from "./js/initModals";
import { initRangeSlider } from "./js/rangeSlider";
import { initBurgerMenu } from './js/burgerMenu';
import { initChart } from './js/chart';
import { initProjectsSlider } from './js/projectsSlider';
import { initOfferSlider } from './js/offersSlider';
import { initVideo } from './js/video';
import { initReviews } from './js/reviews';
import { initOurServices } from './js/ourServices';
import { initFaq } from './js/faq';
import { initExpertSlider } from './js/expertSlider';
import { initForms } from './js/forms';
import { initMap } from './js/map';
import { initApartmentsModal } from './js/apartmentsModal';
import { initCounters } from './js/counterEffect';
import { initTextEffect } from './js/textEffects';
import { initHeader } from './js/header';
import { initPhoneInput } from './js/inputPhone';

document.addEventListener("DOMContentLoaded", function () {
    customSelect()
    initModals()
    initRangeSlider()
    initBurgerMenu()
    initChart()
    initProjectsSlider()
    initOfferSlider()
    initVideo()
    initReviews()
    initOurServices()
    initFaq()
    initExpertSlider()
    initForms()
    initApartmentsModal()
    initCounters()
    initTextEffect()
    initHeader()
    initPhoneInput()

    setTimeout(() => {
        initMap()
    }, 2000)

});
