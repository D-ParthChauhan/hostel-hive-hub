const mongoose = require('mongoose');

const SubredditSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: { type: Number, default: 0 }
});

const PostSchema = new mongoose.Schema({
  subreddit: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Subreddit: mongoose.model('Subreddit', SubredditSchema),
  Post: mongoose.model('Post', PostSchema)
};

