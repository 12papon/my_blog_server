const Post = require("../../models/posts/blogPosts");
const slugify = require("slugify");

const createNewPost = async (postData) => {
  const {
    title,
    content,
    excerpt,
    categories: parsCat,
    tags: parsT,
    userId,
    isFeatured,
    img,
    status,
  } = postData;

  //slag create
  const slug = slugify(title, {
    lower: true,
    strict: true,
    replacement: "-",
  });

  // নিরাপদভাবে পার্স করার নিয়ম
  const categories = parsCat ? JSON.parse(parsCat) : [];
  const tags = parsT ? JSON.parse(parsT) : [];

  const newPost = new Post({
    title,
    slug,
    content,
    excerpt,
    status,
    categories, //Array
    tags, //Array
    featuredimage: {
      url: `/${img.path.replace(/\\/g, "/")}`,
      public_id: img.filename,
    }, //Object {url, public_id}
    author: userId,
    isFeatured: isFeatured === "true",
  });
  // ৩. ডাটাবেজে সেভ করা
  const savedPost = await newPost.save();

  return savedPost;
};
module.exports = createNewPost;
