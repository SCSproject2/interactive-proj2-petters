const router = require('express').Router();
const { Post, User, Comment, Category, Pet } = require('../models');

router.get('/', (req, res) => {
  res.render('search');
});

module.exports = router;
