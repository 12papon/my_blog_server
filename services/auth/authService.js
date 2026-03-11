const User = require("../../models/user/userSchema");

const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    // এখানে এরর থ্রো করলে এটি অটোমেটিক কন্ট্রোলারের catch-এ চলে যাবে
    const error = new Error("এই ইমেইলটি আগে থেকেই আছে!");
    error.statusCode = 400;
    throw error;
  }

  const newUser = new User(userData);
  const savedUser = await newUser.save();
  const userResponse = savedUser.toObject();
  delete userResponse.password;
  return userResponse; // এটি কন্ট্রোলারে যাবে
};

const loginUser = async (email, password) => {
  console.log(email, password);

  // ১. ইউজার আছে কি না চেক করা (পাসওয়ার্ডসহ ডাটা আনা)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি!");
    error.statusCode = 401;
    throw error;
  }

  // ২. পাসওয়ার্ড সরাসরি মেলানো (যেহেতু তুমি bcrypt ব্যবহার করছো না)
  if (user.password !== password) {
    const error = new Error("ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।");
    error.statusCode = 401;
    throw error;
  }

  // ৩. পাসওয়ার্ড বাদ দিয়ে ইউজার ডাটা পাঠানো (সিকিউরিটির জন্য)
  const userResponse = user.toObject();
  delete userResponse.password;
  return userResponse;
};

module.exports = {
  createUser,
  loginUser,
};
