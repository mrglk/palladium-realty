const counterElements = document.querySelectorAll('.js-counter-effect');

export function initCounters() {
  window.addEventListener('scroll', scrollListener)
}

function scrollListener(e) {

  if ((window.scrollY + window.innerHeight / 1.3) < counterElements[0].getBoundingClientRect().x) {
    return
  }

  window.removeEventListener('scroll', scrollListener)

  counterElements.forEach((element) => {
    const max = Number(element.dataset.max);

    if (max > 0) {
      updateCounter(0, 10, max, element);
    }
  });
}

function updateCounter(value, interval, max, element) {
  if (value > max) {
    return;
  }

  element.innerText = value;

  setTimeout(() => {
    const percent = Math.floor(max / 100) || 1;

    updateCounter(value + percent, interval * 1.02, max, element);
  }, interval);
}