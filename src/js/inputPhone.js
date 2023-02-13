import { codes } from './data/codes';
import Inputmask from 'inputmask';
import SimpleBar from 'simplebar';
import { getPageLang } from './utils/helpers';

const lang = getPageLang()
const defaultMask = lang === 'ru' ? 0 : 17

export function initPhoneInput() {
  const inputs = document.querySelectorAll('.js-phone-input');
  const selectElement = renderCodesSelect();

  inputs.forEach((input) => {
    input.after(selectElement.cloneNode(true));
    input.addEventListener('input', handleSearchCountry)

    Inputmask({mask: codes[defaultMask][3]}).mask(input, {greedy: false});
  });

  document.addEventListener('click', function(e) {
    const select = e.target.closest('.js-phone-code-select');
    const option = e.target.closest('.js-phone-code-option');

    if (!select) {
      const selects = document.querySelectorAll('.js-phone-code-select')

      selects.forEach((select) => {
        select.classList.remove('phoneSelect--active')
        const input = select.previousElementSibling

        input.placeholder = lang === 'en' ? 'Phone' : 'Телефон'

        const options = [...select.querySelector('.js-phone-codes').children];

        options.forEach((option) => {
          option.classList.remove('phoneSelect__option--hidden')
        })

        Inputmask({mask: input.dataset.mask}).mask(input, {greedy: false});
      })

      return;
    }

    const options = [...select.querySelector('.js-phone-codes').children];
    const input = select.previousElementSibling

    if (option) {
      const mask = option.dataset.mask

      select.querySelector('.js-phone-codes-current').innerText = `${option.dataset.flag} ${option.dataset.code}`

      input.value = ''
      Inputmask({mask: mask}).mask(input, {greedy: false});
      input.dataset.mask = mask
      input.focus()

      select.classList.remove('phoneSelect--active')

      options.forEach((option) => {
        option.classList.remove('phoneSelect__option--hidden')
      })

      return;
    }

    if (select) {
      Inputmask.remove(input)
      input.value = ''

      select.classList.add('phoneSelect--active')

      input.placeholder = lang === 'en' ? 'Search' : 'Phone'
      input.focus()
    }
  });
}

function handleSearchCountry(e) {
  const input = e.target
  const select = input.nextElementSibling

  if (!select.classList.contains('phoneSelect--active')) {
    return
  }

  const options = [...select.querySelector('.js-phone-codes').children];

  options.forEach((option) => {
    const text = option.textContent.toLowerCase()
    option.classList.toggle('phoneSelect__option--hidden', !text.includes(input.value.toLowerCase()))
  })
}

function renderCodesSelect() {
  const options = codes.map((option) => {
    const [flag, code, country, mask] = option

    return `<div class="phoneSelect__option js-phone-code-option" data-flag="${flag}" data-code="${code}" data-mask="${mask}" data-country="${country}">
        ${flag} ${country} (${code})
    </div>`;
  }).join("");

  const selectElement = document.createElement('div');
  selectElement.classList.add('phoneSelect');
  selectElement.classList.add('js-phone-code-select');

  selectElement.innerHTML = `
        <div class="phoneSelect__currentValue js-phone-codes-current">${codes[defaultMask][0]} ${codes[defaultMask][1]}</div>
        <div class="phoneSelect__options">
            <div class="phoneSelect__optionsViewport js-phone-codes">
                ${options}
            </div>
        </div>
`;

  return selectElement;
}