import DoubleSlider from 'double-slider';

export function initRangeSlider() {
    const rangeElement = document.getElementById('my-slider');

    if (!rangeElement) {
      return
    }

    const rangeSlider = new DoubleSlider(rangeElement);
    const minPrice = document.querySelector(".js-range-min");
    const maxPrice = document.querySelector(".js-range-max");

    rangeSlider.addEventListener('slider:input', () => {
      const {min, max} = rangeSlider.value;



      minPrice.innerHTML = min + 100000;
      maxPrice.innerHTML = max + 100000;
    });
}