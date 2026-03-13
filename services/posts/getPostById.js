const Post = require("../../models/posts/blogPosts");

const getPostById = async (id) => {
  const postData = await Post.findById(id);
  return postData;
};

module.exports = getPostById;
