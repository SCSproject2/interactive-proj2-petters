const router = require('express').Router();
const { Post, Comment, User, Like, Category } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'title', 'body', 'created_at', 'user_id', 'image_url'],
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

        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts);
        posts.reverse();
  
        // Returns the categories and their names
        posts.forEach((item) => {
          console.log(item.categories);
        });
  
        res.render('featured', { posts });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  module.exports = router;