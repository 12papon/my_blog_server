const Post = require("../../models/posts/blogPosts");
const slugify = require("slugify");

const createNewPost = async (postData) => {
  const { title, content, excerpt, categories, tags, featuredImage, userId } =
    postData;

  //slag create
  const slug = slugify(title, {
    lower: true,
    strict: true,
    replacement: "-",
  });

  const newPost = new Post({
    title,
    slug,
    content,
    excerpt,
    categories, //Array
    tags, //Array
    featuredImage, //Object {url, public_id}
    author: userId,
  });
  // ৩. ডাটাবেজে সেভ করা
  const savedPost = await newPost.save();
  return savedPost;
};
module.exports = createNewPost;
