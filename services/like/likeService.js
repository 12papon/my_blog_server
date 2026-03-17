const Post = require("../../models/posts/blogPosts");

const likeCreate = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const { uId } = req.body;

    const post = await Post.findById(postId);
    console.log(post);

    const isLiked = post.likes.includes(uId);
    if (isLiked) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: uId },
      });
      return res.status(200).json({ message: "Unliked successfully" });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $addToSet: { likes: uId },
      });
      return res.status(200).json({ message: "Liked successfully" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = likeCreate;
