const express = require('express');
const Posts = require('../../../data/db');

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);  
  } catch (error) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

module.exports = router;