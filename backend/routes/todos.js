const express = require("express");
const router = express.Router();
const Post = require("../models/ToDo");

// GET BACK ALL ITEMS
router.get("/", async (req, res) => {
  // console.log("Middlewares running");
  // res.send("<h1>we are on todos</h1>");
  try {
    const todos = await Post.find();
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMITS an item
router.post("/add", async (req, res) => {
  // create new post
  const post = new Post({
    todo_description: req.body.todo_description,
    todo_priority: req.body.todo_priority,
    todo_responsible: req.body.todo_responsible,
    todo_completed: req.body.todo_completed
  });

  // save new item
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(400).send(err);
    res.json({ message: err });
  }
});

// GET BACK SPECIFIC Item
router.get("/:postId", async (req, res) => {
  try {
    const specificPost = await Post.findById(req.params.postId);
    res.json(specificPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// PATCH SPECIFIC POST
router.patch("/:postId", async (req, res) => {
  console.log(req.params.postId);
  const myquery = { _id: req.params.postId };
  const newvalues = {
    $set: {
      todo_description: req.body.todo_description,
      todo_responsible: req.body.todo_responsible,
      todo_priority: req.body.todo_priority,
      todo_completed: req.body.todo_completed
    }
  };

  try {
    const patchedPost = await Post.updateOne(myquery, newvalues);
    res.json(patchedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE SPECIFIC POST
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
