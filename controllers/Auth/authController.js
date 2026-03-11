const catchAsync = require("../../utils/catchAsync");
const authService = require("../../services/auth/authService");
const signup = catchAsync(async (req, res, next) => {
  const bodyData = req.body;
  const user = await authService.createUser(bodyData);

  res.status(201).json({
    success: true,
    message: "অ্যাকাউন্ট তৈরি সফল!",
    data: user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // সার্ভিস কল করা
  const user = await authService.loginUser(email, password);
  console.log(user);

  res.status(200).json({
    success: true,
    message: "লগইন সফল হয়েছে!",
    data: user, // সরাসরি ইউজার অবজেক্ট পাঠিয়ে দাও
  });
});

module.exports = {
  signup,
  login,
};
