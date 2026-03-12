const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ১. সাইনআপ এর সময় প্রয়োজনীয় ফিল্ড
    name: { type: String, required: [true, "নাম অবশ্যই দিতে হবে"], trim: true },
    email: {
      type: String,
      required: [true, "ইমেইল অবশ্যই দিতে হবে"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "দয়া করে একটি সঠিক ইমেইল দিন",
      ],
    },
    password: {
      type: String,
      required: [true, "পাসওয়ার্ড অবশ্যই দিতে হবে"],
      minlength: 6,
      select: false, // ডাটাবেজ থেকে ইউজার খুঁজার সময় পাসওয়ার্ড অটোমেটিক আসবে না (নিরাপত্তার জন্য)
    },
    // ২. প্রোফাইল ইনফরমেশন (যেগুলো ইউজার পরে আপডেট করবে)
    designation: { type: String, default: "Professional Developer" },
    address: { type: String, default: "Dhaka, Bangladesh" },
    avatar: { type: String, default: "https://i.ibb.co" }, // ডিফল্ট প্রোফাইল পিকচার}
    aboutme: { type: String, default: "" },
    // ৩. সোশ্যাল লিঙ্কস (অবজেক্ট আকারে রাখা ভালো)
    socialLinks: {
      facebook: { type: String, default: "" },
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },
    // ৪. পরিসংখ্যান ও দক্ষতা
    projectDone: {
      type: Number,
      default: 0,
    },
    awardswon: {
      type: Number,
      default: 0,
    },
    skills: {
      type: [String], // এটি একটি অ্যারে যাতে মাল্টিপল স্কিল রাখা যায়
      default: [],
    },
    // ৫. সিস্টেম রিলেটেড
    joinDate: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // আপনি চাইলে পরে অ্যাডমিন প্যানেল করতে পারবেন
      default: "user",
    },
  },
  { timestamps: true }, // এটি অটোমেটিক createdAt এবং updatedAt তৈরি করে দিবে
);

const User = mongoose.model("User", userSchema);

module.exports = User;
