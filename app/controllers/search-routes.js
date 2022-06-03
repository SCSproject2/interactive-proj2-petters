const router = require('express').Router();
const res = require('express/lib/response');
const { Post, User, Comment, Category, Pet } = require('../models');


router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
  }).then((data) => {
    var categoryArr = [];
    const categories = data.map((post) => post.get({ plain: true }));
    categories.forEach((category) => {
      categoryArr.push({
        id: category.id,
        category_name: category.category_name,
      });
    });
    res.render('search', {
      categoryArr,
    });
  });
});




module.exports = router;