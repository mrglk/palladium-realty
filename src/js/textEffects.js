import { debounce } from "./utils/helpers";

const titles = document.querySelectorAll(".js-title") || [];
const textLines = document.querySelectorAll(".js-text-lines") || [];

export function initTextEffect() {
  setTimeout(() => {
    splitTextByLines();
  }, 1500);

  window.addEventListener(
    "resize",
    debounce(() => {
      splitTextByLines();
      // removeSplitText();
    }, 500)
  );

  const options = {
    root: null,
    // rootMargin: "200px",
    threshold: 1,
  };

  const observer = new IntersectionObserver((items) => {
    items.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) {
        return;
      }

      const className = target.dataset.class;

      if (!className) {
        return;
      }

      target.classList.add(className);
      observer.unobserve(target);
    });
  }, options);

  [...titles, ...textLines].forEach((title) => {
    observer.observe(title);
  });
}

export function splitTextByLines() {
  textLines.forEach((element) => {
    element.classList.add("lines");
    createLines(element);
  });

  function createLines(element) {
    const elementWidth = element.offsetWidth;
    const lines = element.innerHTML
      .replaceAll(/<\/?[^>]+(>|$)/gi, "")
      .replaceAll("&nbsp;", "}")
      .replaceAll("\n", " \n")
      // .trim()
      .split(" ");
    const linesArray = getLines(lines, elementWidth, element);

    element.innerHTML = "";

    for (let i = 0; i < linesArray.length; i++) {
      const lineElement = document.createElement("span");

      lineElement.classList.add("lines__line");
      lineElement.innerHTML = linesArray[i] + " ";
      lineElement.style.transitionDelay = `${i * 50}ms`;

      element.appendChild(lineElement);
    }
  }
}

function getLines(words, width, element) {
  let result = "";

  const tempDiv = document.createElement("div");

  tempDiv.classList.add("lines__temp");
  element.appendChild(tempDiv);

  for (let word of words) {
    const isFirstTimes = tempDiv.innerText.length === 0;

    tempDiv.innerHTML += isFirstTimes ? word : " " + word;

    if (tempDiv.offsetWidth >= width || word.includes("\n")) {
      result += "|";
      tempDiv.innerHTML = word.replace("\n", "");
    }

    result += isFirstTimes ? word : " " + word;
  }

  return result
    .replaceAll("}", "&nbsp;")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function removeSplitText() {
  textLines.forEach((element) => {
    element.classList.remove("lines");
    element.innerHTML = element.innerText;
  });
}
