const Post = require("../../models/posts/blogPosts");

const getPostById = async (id) => {
  const postData = await Post.findById(id)
    .populate("author", "name avatar")
    .exec();
  return postData;
};

module.exports = getPostById;
