import { Body } from "./classes/Body";
import { resetForm } from "./forms";

export function initModals() {
  const openModalLinks = document.querySelectorAll(".js-open-modal");
  const closeModalsLinks = document.querySelectorAll(".js-close-modals");
  const modalsContainer = document.querySelector(".js-modals");

  const searchString = new URLSearchParams(window.location.search);

  const modal = searchString.get("modal");

  if (modal) {
    openModal(modal);
  }

  if (!modalsContainer) {
    return;
  }

  document.addEventListener('click', function(e) {
    const linkElement = e.target.closest('.js-open-modal');

    if (!linkElement) {
      return
    }

    e.preventDefault();

    const modalId = (
      linkElement.dataset.modal || linkElement.getAttribute("href")
    )
      .split("#")
      .pop();

    openModal(modalId);
  })

  closeModalsLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      closeModals();
    });
  });

  // openModalLinks.forEach((link) => {
  //   link.addEventListener("click", function (e) {
  //     e.preventDefault();
  //
  //     const linkElement = e.currentTarget;
  //     const modalId = (
  //       linkElement.dataset.modal || linkElement.getAttribute("href")
  //     )
  //       .split("#")
  //       .pop();
  //
  //     openModal(modalId);
  //   });
  // });

  modalsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("js-modals")) {
      closeModals();
    }
  });
}

export function openModal(modalId) {
  closeModals();

  Body.fixBody();

  const modalsContainer = document.querySelector(".js-modals");
  const modal = document.getElementById(modalId);

  if (!modal) {
    return;
  }

  const form = modal.querySelector('form');
  if (form) {
    resetForm(form);
  }

  modal.classList.add("modals__item--active");
  modalsContainer.classList.add("modals--active");
}

export function closeModals() {
  if (!Body.isFixed()) {
    return
  }

  Body.releaseBody();

  const modalsContainer = document.querySelector(".js-modals");

  modalsContainer.classList.remove("modals--active");
  [...modalsContainer.children].forEach((modal) => {
    modal.classList.remove("modals__item--active");
  });
}
