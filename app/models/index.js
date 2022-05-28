// Create the associations here
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
const Like = require('./Like');
const Category = require('./Category');

// ------- ------- User
User.hasMany(Post, {
  foreignKey: 'user_id',
});

User.hasMany(Vote, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

// ------- ------- Post
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Post.hasMany(Vote, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

Post.hasMany(Category, {
  foreignKey: 'id',
});

// ------- ------- Vote
Like.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Like.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

// ------- ------- Comment
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

// ------- ------- Category
Category.belongsTo(Post, {
  foreignKey: 'post_ud',
});

module.exports = { User, Post, Comment, Like, Category };
