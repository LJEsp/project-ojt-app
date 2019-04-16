const { body } = require("express-validator/check");
const isBefore = require("date-fns/is_before");
const isSameDay = require("date-fns/is_same_day");
const User = require("../models/user/user");

const validateLeaveRequest = [
  body("date")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Date is required")
    .custom(value => {
      if (isBefore(value, new Date())) {
        throw new Error("Date must not be in the past");
      } else {
        return value;
      }
    })
    .custom((value, { req }) => {
      return User.findById(req.user._id)
        .lean()
        .then(userTrainee => {
          const duplicates = userTrainee.roleData.leaveRequests.filter(
            leaveRequest => isSameDay(leaveRequest.date, value)
          );

          if (duplicates.length > 0) {
            return Promise.reject("A leave on that day already exists");
          } else {
            return value;
          }
        });
    }),

  body("reason")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Reason is required")
];

module.exports = { validateLeaveRequest };
