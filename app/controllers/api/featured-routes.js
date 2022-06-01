const router = require('express').Router();
const { Post, Comment, User, Like, Category } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
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
          '(SELECT COUNT(*) FROM `like` WHERE post.id = like.post_id)'
        ),
        'like_count',
      ],
    ],
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
      // let largestNum = dbPostData.reduce(
      //   (num1, num2) =>
      //   (num1 = num1 > num2.likes ? num1 : num2.likes),
      // 0);
      // console.log(largestNum);

      const posts1 = dbPostData.map((post) => post.get({ plain: true }));

      posts1.sort(function (a, b) {
        return a.like_count - b.like_count;
      });

      posts1.reverse();

      // Returns the categories and their names
      posts1.forEach((item) => {
        console.log(item.categories);
      });
      const posts = posts1.slice(0, 5);

      res.render('featured', { posts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
