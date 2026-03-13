const catchAsync = require("../../utils/catchAsync");
const createNewPost = require("../../services/posts/createNewPost");
const getPostById = require("../../services/posts/getPostById");
const featurPost = require("../../services/posts/featuredPost");
const pagiPost = require("../../services/posts/paginationPost");

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
const getPost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const getPost = await getPostById(id);

  res.status(201).json({
    success: true,
    message: "Post get successfully!",
    data: getPost,
  });
});

//Featured post get
const featurePost = catchAsync(async (req, res, next) => {
  const famPost = await featurPost();

  res.status(201).json({
    success: true,
    message: "Get post successfully!",
    data: famPost,
  });
});
//Pagination post get
const paginationPost = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit; // এখানে সরাসরি ভেরিয়েবল ব্যবহার করুন

  const pagination = {
    page: page,
    limit: limit,
    skip: skip,
  };
  const getPagiPost = await pagiPost(pagination);

  res.status(201).json({
    success: true,
    message: "Pagination successfully!",
    data: getPagiPost.postData,
    totalPage: getPagiPost.totalPage,
  });
});

module.exports = {
  createPost,
  getPost,
  featurePost,
  paginationPost,
};
