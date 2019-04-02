const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company는 필수입니다.";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "title은 항목은 필수입니다.";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from 항목은 필수입니다.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
