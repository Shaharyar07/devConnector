const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { validationResult, body, check } = require("express-validator");
const authenticate = require("../../middleware/authenticate");
const Post = require("../../modal/Post");
const Profile = require("../../modal/Profile");

// Route: Get  api/posts/test
// Access public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

// Route 1: Post  api/posts
// Create Post
// Access private
router.post(
  "/",
  authenticate,
  [
    check(
      "text",
      "Text feild is required minimum length is 6 characters and maximum length is 200 characters"
    ).isLength({ min: 5, max: 200 }),
  ],
  async (req, res) => {
    //If there are errors then throw a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      });
      newPost.save().then((post) => res.json(post));
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occured");
    }
  }
);

// Route 2: Get  api/posts
// Fetch Posts
// Access public

router.get("/", async (req, res) => {
  try {
    Post.find()
      .sort({ date: -1 })
      .then((posts) => res.json(posts))
      .catch((err) => {
        res.status(404).json({ noPostsFound: " Posts Not Found" });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});
// Route 3: Get  api/post/:id
// Fetch Post by id
// Access public

router.get("/:id", async (req, res) => {
  try {
    Post.findById(req.params.id)
      .sort({ date: -1 })
      .then((post) => res.json(post))
      .catch((err) => {
        res.status(404).json({ noPostFound: "Invalid Post ID" });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});

// Route 4: Delete  api/post/:id
// Delete Post by id
// Access private
router.delete("/:id", authenticate, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post Not Found");
    }
    Profile.findOne({ user: req.user.id }).then(
      Post.findByIdAndDelete(req.params.id)
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
          }
        })
        .then(res.json({ success: true }))
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Some internal error occured");
  }
});

// Route 5: Post  api/post/like/:id
// Like Post by id
// Access private
router.post("/like/:id", authenticate, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Not Found");
    }
    Profile.findOne({ user: req.user.id }).then(
      Post.findById(req.params.id).then((post) => {
        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ postAlreadyLiked: "User has already liked this post" });
        }
        post.likes.unshift({ user: req.user.id });
        post.save().then((post) => res.json({ post: post }));
      })
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});

// Route 6: Post  api/post/unlike/:id
// Like Post by id
// Access private
router.post("/unlike/:id", authenticate, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Not Found");
    }
    Profile.findOne({ user: req.user.id }).then(
      Post.findById(req.params.id).then((post) => {
        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ postNotLiked: "User has not liked this post " });
        }
        const removeIndex = post.likes
          .map((item) => item.user.toString())
          .indexOf(req.user.id);

        //Splice the array to remove
        post.likes.splice(removeIndex, 1);
        post.save().then((post) => res.json({ post: post }));
      })
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});

// Route 7: Post  api/post/comment/:id
// comment on  Post by id
// Access private
router.post("/comment/:id", authenticate, async (req, res) => {
  try {
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});
// Route 8: Delete comment  api/post/comment/:id/:comment_id
// Like Post by id
// Access private
router.post("/comment/:id/:comment_id", authenticate, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Not Found");
    }
    Profile.findOne({ user: req.user.id }).then(
      Post.findById(req.params.id).then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(400)
            .json({ postNotCommented: "User has not commented on this post " });
        }
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice the array to remove
        post.comments.splice(removeIndex, 1);
        post.save().then((post) => res.json({ post: post }));
      })
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});

module.exports = router;
