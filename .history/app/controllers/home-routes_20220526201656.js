const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// In this path, the main.handlebars template renders always and inside the {{{body}}} section....
// We render the homepage.handlebars template
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'description', 'created_at', 'user_id'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      // Serialize the data, essentially making it an easier object to iterate through
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // Reverse the order of all posts so the newest posts show near the top
      posts.reverse();
      // Render the homepage template and include the posts object we just declared
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Renders a single post with more detail
router.get('/post/:id', (req, res) => {
  res.render('single-post');
});

module.exports = router;
