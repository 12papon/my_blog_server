const Post = require("../../models/posts/blogPosts");

const pagiPost = async ({ page, limit, skip }) => {
  const postData = await Post.find()
    .sort({ views: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  const totalPost = await Post.countDocuments({});
  const totalPage = Math.ceil(totalPost / limit) || 0;
  return { postData, totalPage };
};

module.exports = pagiPost;
