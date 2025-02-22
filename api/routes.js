const express = require("express");
const Post = require("./models/Post");
const router = express.Router();

//list
router.get("/posts", async (req, res) => {
  const posts = await Post.find();

  res.json({
    success: true,
    data: posts
  });
});

//create
router.post("/posts", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  try {
    await post.save();
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(400);
    res.json({
      success: false,
      message: error.message
    });
  }
});

//read
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) {
      throw new Error("Post not found");
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(404);
    res.json({
      success: false,
      message: error.message
    });
  }
});

//update
router.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) {
      throw new Error("Post not found");
    }

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(404);
    res.json({
      success: false,
      message: error.message
    });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const answer = await Post.deleteOne({ _id: req.params.id });
    console.log(answer);
    if (answer.deletedCount === 0) {
      throw new Error("Post not found");
    }
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(404);
    res.json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
