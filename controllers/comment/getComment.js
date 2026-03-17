const catchAsync = require("../../utils/catchAsync");
const { getCom } = require("../../services/comment/comment");

const getComPost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const data = await getCom(postId);
  res.status(200).json({
    success: true,
    message: "Comment get successfully!",
    data: data,
  });
});
module.exports = getComPost;
