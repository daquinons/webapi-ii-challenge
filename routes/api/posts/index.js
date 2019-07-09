const express = require('express');
const Posts = require('../../../data/db');

const router = express.Router();

router.get('/posts', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' });
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (post) {
      res.json(post);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

router.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (post) {
      await Posts.remove(id);
      res.json(post);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

module.exports = router;
