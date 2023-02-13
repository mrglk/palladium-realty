export default class Validator {
  constructor(form) {
    this.form = form;
    this.elements = [...this.form.querySelectorAll("[data-validation]")];
  }

  validate() {
    for (let input of this.elements) {
      this.checkField(input, input.dataset.validation);
    }
    return this.checkForm();
  }

  clearErrors() {
    for (let input of this.elements) {
      input.removeAttribute('data-valid');
    }
  }

  checkForm() {
    return !this.elements.some((item) => item.dataset.valid === "false");
  }

  checkField(field, type) {
    switch (type) {
      case "checkbox":
        field.dataset.valid = field.checked;
        break;

      case "radio":
        let name = field.getAttribute("name"),
          radioButtons = [
            ...document.querySelectorAll(`input[name="${name}"]`),
          ];
        field.dataset.valid = radioButtons
          .some((radio) => radio.checked)
          .toString();
        break;

      case "relative":
        let ids = field.dataset.relative.split(",");
        field.dataset.valid = "true";
        for (let id of ids) {
          let relativeField = document.getElementById(id);
          if (relativeField.checked) {
            field.dataset.valid = (
              relativeField.checked === !!field.value.length
            ).toString();
          }
        }
        break;

      case "required":
        let minLength = !!field.getAttribute("minlength")
          ? field.getAttribute("minlength")
          : 2;
        field.dataset.valid = (field.value.length >= minLength).toString();
        break;

      case "phone":
        // let phonePattern =
        //     /^(\+7)?[\s]\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
        //   phoneTest = phonePattern.test(field.value);
        // field.dataset.valid = phoneTest.toString();
        field.dataset.valid = String(field.value.length > 0 && !field.value.includes('_'));
        break;
      case "email":
        let emailPattern =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          emailTest = emailPattern.test(field.value);
        field.dataset.valid = emailTest.toString();
        break;

      case "password":
        let passwordPattern =
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          passwordTest = passwordPattern.test(field.value);

        field.dataset.valid = passwordTest.toString();

        if (this.passwordField && this.passwordField !== field.value) {
          field.dataset.valid = "false";
          this.passwordField.dataset.valid = "false";
        }

        this.passwordField = field;
        break;
    }
  }
}
