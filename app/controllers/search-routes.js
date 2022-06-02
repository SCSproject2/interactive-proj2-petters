const router = require('express').Router();
const res = require('express/lib/response');
const { Post, User, Comment, Category, Pet } = require('../models');


router.get('/', (req, res) => {
  res.render('search');
});




module.exports = router;