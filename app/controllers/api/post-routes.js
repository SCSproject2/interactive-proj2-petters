const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Category, Comment, Like } = require('../../models');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // Access the req.body upon uploading a post to dynamically label the file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
  // Extract the raw path
  const imagePath = req.file.path;
  var finalPath = '';
  // Convert to valid a link if on windows
  if (imagePath.includes('public\\')) {
    const updatedPath = imagePath.replace('public\\', '');
    finalPath = updatedPath.replace('images\\', 'images/');
    // Else, if on mac, run this conversion
  } else {
    finalPath = imagePath.replace('public/', '');
  }

  var chosenCategory = '';
  // If they choose an existing category, then use it
  if (req.body.existing_categories) {
    chosenCategory = req.body.existing_categories;
  } else {
    // else, use the new category
    chosenCategory = req.body.new_category;
  }

  console.log(true, chosenCategory);
  Post.create({
    title: req.body.title,
    body: req.body.desc,
    user_id: req.session.user_id,
    category_id: 2,
    image_url: finalPath,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => res.status(500).json(err));
});

// Get all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'body',
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
      // {
      //   model: Like,
      //   attributes: ['user_id'],
      // },
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
        attributes: [
          'id',
          'comment_text',
          'user_id',
          'post_id',
          'created_at',
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM `like` WHERE post.id = like.post_id)'
            ),
            'like_count',
          ],
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
