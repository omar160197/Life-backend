const { body } = require("express-validator");


module.exports.postDiscount = () => {
  return [
    body("discountAmount").isNumeric().withMessage("discountAmount is required and must be A number"),
    body("date").isString().withMessage("Discount date must be date formate"),
    body("style").isString().withMessage("Discount style must be style formate")
  ];
};

module.exports.putDiscount = () => {
  return [
  body("_id").isNumeric().withMessage("Discount ID must be a number"),
  body("discountAmount").isNumeric().withMessage("discountAmount is required and must be A number"),
  body("date").isString().withMessage("Discount date must be date formate"),
  body("style").isString().withMessage("Discount style must be style formate")
  ];
};

module.exports.deleteDiscount = () => {
  return body("_id").isNumeric().withMessage("id is not a number");
};
