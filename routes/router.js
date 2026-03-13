const express = require("express");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/error");
const authControllers = require("../controllers/Auth/authController");
const allPostController = require("../controllers/post/allPostController");
const upload = require("../services/storage/storage");

const router = express.Router();

router.get("/featured", allPostController.featurePost);
router.get("/post/:id", allPostController.getPost);
router.get("/post", allPostController.paginationPost);
router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.post(
  "/createpost",
  upload.single("featuredimage"),
  allPostController.createPost,
);
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
