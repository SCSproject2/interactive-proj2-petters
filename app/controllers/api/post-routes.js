const router = require('express').Router();
const { Post, User, Category, Comment } = require('../../models');

// Get all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'body', 'category_id'],
    order: [['created_at', 'DESC']],
    include: [
      //   {
      //     model: Comment,
      //     attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
      //     include: {
      //       model: User,
      //       attributes: ['username'],
      //     },
      //   },
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Category,
        attributes: ['category_name'],
      },
    ],
  })
    .then((dbPostData) => {
      console.log(dbPostData);
      res.json(dbPostData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get one post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'body'],
    include: [
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
        model: Category,
        attributes: ['category_name'],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Create a new post
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    // user_id: req.session.user_id,
    user_id: req.body.user_id,
    category_id: req.body.category_id
    // image_url: req.body.image_url
})
.then(dbPostData=> res.json(dbPostData))
.catch(err=> res.status(500).json(err));
});

// Update a post
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
      body: req.body.body,
      category_id: req.body.category_id,
      image_url: req.body.image_url,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Delete a post
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
