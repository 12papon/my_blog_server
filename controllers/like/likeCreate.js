const likeService = require("../../services/like/likeService");
const catchAsync = require("../../utils/catchAsync");

const likeUpdater = catchAsync(async (req, res, next) => {
  await likeService(req, res, next);
});

module.exports = likeUpdater;
