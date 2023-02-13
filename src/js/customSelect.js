export function customSelect() {
  const selectInputs = document.querySelectorAll('.js-select');
  if (!selectInputs) {
    return;
  }

  selectInputs.forEach((select) => {
    initSelect(select);
  });

  function initSelect(selectElement) {
    selectElement.style.display = 'none';

    const options = [...selectElement.options].map(option => option.innerText);
    const selectHtml = renderSelect(options);

    selectElement.after(selectHtml);

    selectHtml.addEventListener('click', clickElement);
  }

  function clickElement(e) {
    const option = e.target.closest('.js-select-option');
    const select = e.currentTarget;

    const openedSelect = document.querySelector('.select--active')

    if (openedSelect) {
      openedSelect.classList.remove('select--active')
    }

    if (option) {
      const currentElement = select.querySelector('.js-select-current');

      currentElement.innerText = option.textContent;

      const selectElement = select.previousElementSibling

      if (selectElement.tagName === 'SELECT') {
        [...selectElement.options].forEach((option) => {
          if (option.innerText === currentElement.innerText) {
            option.selected = 'selected'
          } else {
            option.removeAttribute('selected')
          }
        })
      }

      return;
    }

    if (openedSelect === select) {
      openedSelect.classList.remove('select--active')
      return;
    }

    const currentValue = e.target.closest('.js-select-current');

    if (currentValue) {
      select.classList.add('select--active');
    }

    document.addEventListener('click', documentClick)
  }

  function renderSelect(options) {
    const selectWrapper = document.createElement('div');

    selectWrapper.classList.add('select');

    const optionsHtml = options.map((option) => {
      return `<div class="select__option js-select-option">${option}</div>`;
    }).join('');

    selectWrapper.innerHTML = `
    	<div class="select__currentValue js-select-current">${options[0]}</div>
      <div class="select__options">
      		${optionsHtml}
      </div>
  `;

    return selectWrapper;
  }

  function documentClick(e) {
    if (e.target.closest('.select')) {
      return
    }

    document.removeEventListener('click', documentClick)

    const select = document.querySelector('.select--active')

    if (select) {
      select.classList.remove('select--active')
    }
  }

}
