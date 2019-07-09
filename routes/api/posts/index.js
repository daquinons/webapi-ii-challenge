const express = require('express');
const Posts = require('../../../data/db');

const router = express.Router();

router.get("/posts", async (req, res) => {
  const posts = await Posts.find();
  res.json(posts);
});

module.exports = router;