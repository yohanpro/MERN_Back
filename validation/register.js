const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "이름은 최소 3글자 이상입니다.";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "이름은 필수입니다.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email은 필수입니다.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email 형식이 올바르지 않습니다.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password는 필수입니다.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password는 6글자 이상입니다.";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password 확인이 필요합니다.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password가 일치하지 않습니다";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
