export class Body {
  constructor() {
    this.scrollPosition = 0;
  }

  static fixBody() {
    const body = document.body;

    body.dataset.state = "fixed";

    this.scrollPosition = window.pageYOffset;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${this.scrollPosition}px`;
    body.style.width = "100%";
  }

  static releaseBody() {
    const body = document.body;

    body.dataset.state = "released";

    body.style.removeProperty("overflow");
    body.style.removeProperty("position");
    body.style.removeProperty("top");
    body.style.removeProperty("width");
    window.scrollTo(0, this.scrollPosition);
  }

  static toggleBody() {
    document.body.dataset.state === "fixed"
      ? this.releaseBody()
      : this.fixBody();
  }

  static toggleOverlay(force) {
    const overlay = document.querySelector(".js-overlay");

    if (force !== undefined) {
      overlay.classList.toggle("overlay--active", force);
    } else {
      overlay.classList.toggle("overlay--active");
    }
  }

  static releaseOverlay() {
    const overlay = document.querySelector(".js-overlay");

    overlay.classList.remove("overlay--active");
  }

  static isFixed() {
    return document.body.dataset.state === "fixed";
  }
}
