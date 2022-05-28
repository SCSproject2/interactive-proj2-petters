const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../../utils/auth');

// Return all posts associated with the user
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    
  })
  res.render('dashboard');
});

module.exports = router;
