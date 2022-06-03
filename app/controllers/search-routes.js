const router = require('express').Router();
const { Post, User, Comment, Category, Pet, Like } = require('../models');
const sequelize = require('../config/connection');

router.get('/user/:username', (req, res) => {
  User.findAll({
    where: {
      username: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('username')),
        'LIKE',
        '%' + req.params.username.toLowerCase() + '%'
      ),
    },
  })
    .then((data) => {
      const userData = data.map((post) => post.get({ plain: true }));
      // res.json(userData);
      return userData;
    })
    .then((userData) => {
      Post.findAll({
        attributes: [
          'id',
          'title',
          'body',
          'created_at',
          'user_id',
          'image_url',
          [
            sequelize.literal(
              '(SELECT category_name FROM `category` WHERE post.category_id = category.id)'
            ),
            'category_name',
          ],
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM `like` WHERE post.id = like.post_id)'
            ),
            'like_count',
          ],
        ],
        include: [
          {
            model: Comment,
            attributes: [
              'id',
              'comment_text',
              'user_id',
              'post_id',
              'created_at',
            ],
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
          const postData = dbPostData.map((post) => post.get({ plain: true }));
          var userPostObject = [];
          userData.forEach((user) => {
            postData.forEach((post) => {
              if (user.id == post.user_id) {
                userPostObject.push(post);
              }
            });
          });
          if (userPostObject.length >= 1) {
            res.json(userPostObject);
          } else {
            res.json('No Users found');
          }
        })
        .catch((err) => {
          res.json('No Users found');
        });
    });
});

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
