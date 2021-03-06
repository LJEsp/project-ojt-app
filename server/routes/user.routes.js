const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const passport = require("passport");
const permittedRoles = require("../utils/permittedRoles");
const dynamicValidation = require("../validation/dynamicValidation");
const {
  validateCreateUser,
  validateCreateUserTrainee,
  validateCreateUserSupervisor
} = require("../validation/validateCreateUser");
const {
  validateUpdateUser,
  validateUpdateUserTrainee,
  validateUpdateUserSupervisor
} = require("../validation/validateUpdateUser");
const validateChangeUserPassword = require("../validation/validateChangeUserPassword");
const validateUpdateSchedule = require("../validation/validateUpdateSchedule");
const enums = require("../enums");

// >>> /api/users
// --->>> /api/users/test - testRoute
router
  .route("/test")
  .get(
    passport.authenticate("jwt", { session: false }),
    UserController.testRoute
  );

// --->>> /api/users/register - registerUser
router.route("/register").post(
  passport.authenticate("jwt", { session: false }),
  permittedRoles(enums.roles.ADMINISTRATOR),
  function(req, res, next) {
    if (req.body.role === enums.roles.TRAINEE) {
      dynamicValidation(validateCreateUserTrainee, req, res, next);
    } else if (
      req.body.role === enums.roles.SUPERVISOR ||
      req.body.role === enums.roles.EMPLOYEE
    ) {
      dynamicValidation(validateCreateUserSupervisor, req, res, next);
    } else {
      dynamicValidation(validateCreateUser, req, res, next);
    }
  },
  UserController.createUser
);

// --->>> GET /api/users/ - getUsers
router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(
      enums.roles.ADMINISTRATOR,
      enums.roles.SUPERVISOR,
      enums.roles.EMPLOYEE
    ),
    UserController.getUsers
  );

// --->>> GET /api/users/user/:id - getUser
router
  .route("/user/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(
      enums.roles.ADMINISTRATOR,
      enums.roles.SUPERVISOR,
      enums.roles.EMPLOYEE
    ),
    UserController.getUser
  );

// --->>> GET /api/users/current - getCurrentUser
router
  .route("/current")
  .get(
    passport.authenticate("jwt", { session: false }),
    UserController.getCurrentUser
  );

// --->>> POST /api/users/login - loginUser
router.route("/login").post(UserController.loginUser);

// --->>> PUT /api/users/:id - updateUser
router.route("/:id").put(
  passport.authenticate("jwt", { session: false }),
  permittedRoles(enums.roles.ADMINISTRATOR),
  function(req, res, next) {
    if (req.body.role === enums.roles.TRAINEE) {
      dynamicValidation(validateUpdateUserTrainee, req, res, next);
    } else if (
      req.body.role === enums.roles.SUPERVISOR ||
      req.body.role === enums.roles.EMPLOYEE
    ) {
      dynamicValidation(validateUpdateUserSupervisor, req, res, next);
    } else {
      dynamicValidation(validateUpdateUser, req, res, next);
    }
  },
  UserController.updateUser
);

// --->>> PUT /api/users/:id/change-password - updatePassword
router
  .route("/:id/change-password")
  .put(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    validateChangeUserPassword,
    UserController.updatePassword
  );

// --->>> PUT /api/users/:id/schedule
router
  .route("/:id/schedule")
  .put(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(
      enums.roles.ADMINISTRATOR,
      enums.roles.SUPERVISOR,
      enums.roles.TRAINEE
    ),
    validateUpdateSchedule,
    UserController.updateTraineeSchedule
  );

// --->>> DELETE /api/users/:id - deleteUser
router
  .route("/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    UserController.deleteUser
  );

module.exports = router;
