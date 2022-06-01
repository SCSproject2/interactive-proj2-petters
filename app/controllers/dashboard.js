const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, Like, User, Category } = require('../models');
const withAuth = require('../../utils/auth');

// Return all posts associated with the user
// router.get('/', withAuth, (req, res) => {
router.get('/', (req, res) => {
  // Add a new route here that returns all posts associated with user, you can easily extract this via 'req.session.user_id'
  // Return all users active posts in the data base
  Post.findAll({
    where: {
      user_id: 3,
    },
    attributes: ['id', 'title', 'body', 'created_at', 'user_id', 'image_url'],
    include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Like,
        attributes: ['user_id'],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      posts.reverse();
      res.render('dashboard', {
        posts,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
