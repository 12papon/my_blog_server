const Comment = require("../../models/comment/comment");

const createCom = async (postData) => {
  const { text, user, post } = postData;

  const newCommentCreate = new Comment({
    text: text,
    user: user,
    post: post,
  });
  const res = await newCommentCreate.save();
  return res;
};
const getCom = async (postId) => {
  const res = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "name avatar");
  return res;
};
module.exports = {
  createCom,
  getCom,
};
