const catchAsync = require("../../utils/catchAsync");
const { createCom } = require("../../services/comment/comment");

const createComment = catchAsync(async (req, res, next) => {
  const { text, user, post } = req.body;
  const data = await createCom({ text, user, post });

  res.status(200).json({
    success: true,
    message: "Comment created successfully!",
    data: data,
  });
});


module.exports = {
  createComment,
};
