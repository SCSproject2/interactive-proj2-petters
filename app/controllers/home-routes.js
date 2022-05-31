const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Like } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');

  // Post.findAll({
  //   attributes: ['id', 'title', 'description', 'created_at', 'user_id'],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: [
  //         'id',
  //         'comment_text',
  //         'post_id',
  //         'user_id',
  //         'created_at',
  //         [
  //           sequelize.literal(
  //             '(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'
  //           ),
  //           'like_count',
  //         ],
  //       ],
  //       include: {
  //         model: User,
  //         attributes: ['username'],
  //       },
  //     },
  //     {
  //       model: Like,
  //       attributes: ['id', 'user_id'],
  //       include: {
  //         model: User,
  //         attributes: ['username'],
  //       },
  //     },
  //     {
  //       model: User,
  //       attributes: ['username'],
  //     },
  //   ],
  // })
  //   .then((dbPostData) => {
  //     // Serialize the data, essentially making it an easier object to iterate through
  //     const posts = dbPostData.map((post) => post.get({ plain: true }));
  //     // Reverse the order of all posts so the newest posts show near the top
  //     posts.reverse();

  //     res.render('homepage');
  //     // Use the below render to include the posts object we just declared and the sessions data
  //     // res.render('homepage', {
  //     //   posts,
  //     //   loggedIn: req.session.loggedIn,
  //     //   username: req.session.username,
  //     // });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

// Renders a single post with more detail
router.get('/post/:id', (req, res) => {});

module.exports = router;
