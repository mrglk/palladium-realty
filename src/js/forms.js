import Validator from './classes/Validator';
import { openModal } from './initModals';
import { getPageLang } from './utils/helpers';

export function initForms() {
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.addEventListener('submit', submitForm)
  })
}

function submitForm(e) {
  e.preventDefault()
  const form = e.currentTarget
  const lang = getPageLang()

  const codeSelector = form.querySelector('.js-phone-codes-current').innerText

  const validator = new Validator(form);
  const formData = new FormData(form);
  const phone = formData.get('tel')

  if (codeSelector) {
    formData.set('tel', ('+' + codeSelector.split('+').pop() + ' ' + phone).trim())
  }

  formData.set('lang', lang)

  const formPurpose = document.querySelector('.js-select-purpose')?.value || ''
  const formType = document.querySelector('.js-select-type')?.value || ''
  const formDistrict = document.querySelector('.js-select-district')?.value || ''

  const formMin = document.querySelector('.js-range-min')?.innerText || 0
  const formMax = document.querySelector('.js-range-max')?.innerText || 0

  formData.set('purpose', formPurpose)
  formData.set('type', formType)
  formData.set('district', formDistrict)
  formData.set('price', `${formMin} - ${formMax}`)

  const url = form.getAttribute("action");
  const isFormValid = validator.validate();

  const button = form.querySelector('input[type="submit"]');

  if (!url || !isFormValid) {
    return;
  }

  if (button) {
    button.setAttribute('disabled', 'disabled')
  }

  for (let pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
  }

  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((response) => {
      form.reset()
      button.value = button.dataset.success || 'Sent'

      openModal('thankYou');
      setTimeout(() => {
        button.removeAttribute('disabled')

        window.location.href = window.location.href + '?modal=thankYou'
      }, 2000)
    });
}

export function resetForm(form) {
  form.reset();
  const validator = new Validator(form);
  validator.clearErrors();
}
