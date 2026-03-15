const Post = require("../../models/posts/blogPosts");

const famousPost = async () => {
  const famPost = await Post.find()
    .sort({ views: -1 })
    .limit(3)
    .populate("author", "name avatar")
    .exec();
  return famPost;
};

module.exports = famousPost;
