const express = require("express");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/error");
const authControllers = require("../controllers/Auth/authController");

const router = express.Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const a = false;
    if (a) {
      res.send("Hallo");
    } else {
      next(new ErrorHandler("A value is not true", 400));
    }
  }),
);

module.exports = router;
