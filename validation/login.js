const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email 형식이 올바르지 않습니다.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email은 필수입니다.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password는 필수입니다.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
