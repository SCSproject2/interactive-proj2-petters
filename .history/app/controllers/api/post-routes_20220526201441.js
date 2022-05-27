const router = require('express').Router();
const { Post } = require('../../models');

// Create a new post
router.post('/', (req, res) => {});

// Delete a post
router.delete('/:id', (req, res) => {});

// Update a post
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
      description: req.body.description,
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
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
