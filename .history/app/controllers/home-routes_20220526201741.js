const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
});

// Renders a single post with more detail
router.get('/post/:id', (req, res) => {});

module.exports = router;
