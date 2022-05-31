const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Like, Category } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'body', 'created_at', 'user_id'],
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

      // Returns the categories and their names
      // posts.forEach((item) => {
      //   console.log(item.categories);
      // });

      res.render('homepage', { posts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Renders a single post with more detail
router.get('/post/:id', (req, res) => {});

module.exports = router;
