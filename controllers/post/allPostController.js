const catchAsync = require("../../utils/catchAsync");
const createNewPost = require("../../services/posts/createNewPost");

//createPost
const createPost = catchAsync(async (req, res, next) => {
  const bodyData = req.body;
  const fil = req.file;
  bodyData.img = fil;
 

  const post = await createNewPost(bodyData);
  res.status(201).json({
    success: true,
    message: "Post created successfully!",
    data: post,
  });
});
//getPost
const getPost = catchAsync(async (req, res, next) => {});

module.exports = {
  createPost,
  getPost,
};
