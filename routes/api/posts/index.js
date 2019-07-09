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

router.post('/posts', async (req, res) => {
  try {
    const newPost = req.body;
    if (!newPost.title || !newPost.contents) {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    } else {
      const createdPostId = await Posts.insert(newPost);
      const createdPost = await Posts.findById(createdPostId.id);
      res.status(201).json(createdPost[0]);
    }
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (post.length) {
      res.json(post[0]);
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
    if (post.length) {
      await Posts.remove(id);
      res.json(post[0]);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

router.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const editedPost = { ...req.body, id };
    const post = await Posts.findById(id);
    if (post.length) {
      if (editedPost.title && editedPost.contents) {
        await Posts.update(id, editedPost);
        const updatedPost = await Posts.findById(id);
        res.json(updatedPost);
      } else {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
      }
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

router.get('/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (post.length) {
      const comments = await Posts.findPostComments(id);
      res.json(comments);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The comments information could not be retrieved.' });
  }
});

router.post('/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id); 
    let commentInfo = req.body;
    if (!post.length) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
      if (!commentInfo.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
      } else {
        commentInfo = { text: commentInfo.text, post_id: id }
        const newCommentId = await Posts.insertComment(commentInfo);
        const newComment = await Posts.findCommentById(newCommentId.id);
        res.status(201).json(newComment);
      }
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  }
});

module.exports = router;
