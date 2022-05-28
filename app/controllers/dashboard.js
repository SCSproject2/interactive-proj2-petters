const router = require('express').Router();
const { Post, Comment, Like, User } = require('../models');
const withAuth = require('../../utils/auth');

// Return all posts associated with the user
router.get('/', withAuth, (req, res) => {
  // Add a new route here that returns all posts associated with user, you can easily extract this via 'req.session.user_id'
  // Return all users active posts in the data base
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'created_at', 'user_id', 'description'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((dbPostData) => {
      // Declare an empty object to hold all the required data
      const posts = [];

      // Check how many posts a user has so we can run a loop or just return the single data
      if (dbPostData.length == 1) {
        const title = dbPostData[0].dataValues.title;
        const description = dbPostData[0].dataValues.description;
        const date = dbPostData[0].dataValues.created_at;
        const postId = dbPostData[0].dataValues.id;
        posts.push({ postId, title, description, date });
      } else {
        dbPostData.forEach((post) => {
          const title = post.dataValues.title;
          const description = post.dataValues.description;
          const date = post.dataValues.created_at;
          const postId = post.dataValues.id;
          posts.push({ postId, title, description, date });
        });
      }
      res.render('dashboard');
      // Use the below render to return posts and session data
      // res.render('dashboard', {
      //   posts,
      //   loggedIn: req.session.loggedIn,
      //   username: req.session.username,
      // });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
