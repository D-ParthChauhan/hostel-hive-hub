const express = require('express');
const router = express.Router();
const { Subreddit, Post } = require('../models/Community');
const { verifyToken, verifyCouncil } = require('../middleware/auth');

// --- SUBREDDITS ---

// Get all subreddits
router.get('/subreddits', async (req, res) => {
  const subs = await Subreddit.find();
  res.json(subs);
});

// Create Subreddit (Council Only)
router.post('/subreddits', verifyCouncil, async (req, res) => {
  const sub = new Subreddit({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.user._id
  });
  try {
    const savedSub = await sub.save();
    res.json(savedSub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- POSTS ---

// Get posts (filter by subreddit optional)
router.get('/posts', async (req, res) => {
  const filter = req.query.subreddit ? { subreddit: req.query.subreddit } : {};
  const posts = await Post.find(filter).sort({ createdAt: -1 });
  res.json(posts);
});

// Create Post (Any logged in student)
router.post('/posts', verifyToken, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    subreddit: req.body.subreddit,
    author: req.user.name // From JWT
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;