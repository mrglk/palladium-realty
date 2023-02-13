import { SlideToggle } from './classes/SlideToggle';

export function initFaq() {
  const itemsWrapper = document.querySelector(".js-faq-wrapper");

  if (!itemsWrapper) {
    return;
  }

  itemsWrapper.addEventListener("click", function (event) {
    const target = event.target;
    const item = target.closest(".faq__itemHeader");


    if (!item) {
      return;
    }

    const SpoilerElement = new SlideToggle(
      item.dataset.container,
      "faq__itemHeader--active"
    );

    item.classList.toggle("faq__itemHeader--active");
    SpoilerElement.toggle();
  });
}