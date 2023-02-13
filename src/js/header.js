let prevScroll = 0;

const header = document.querySelector('.js-header');

export function initHeader() {

  window.addEventListener('scroll', function(e) {

    if(document.body.dataset.state === "fixed") {
      return
    }

    if (window.scrollY < 100) {
      header.classList.remove('header--hidden');
      header.classList.remove('header--active');
    } else {
      header.classList.toggle('header--hidden', prevScroll < window.scrollY);
      header.classList.toggle('header--active', prevScroll > window.scrollY);
    }

    prevScroll = window.scrollY;
  });
}

