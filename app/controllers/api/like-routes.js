const router = require('express').Router();
//do we need other models?? probably not
const { Like, Post, User } = require('../../models');

//Get likes
router.get('/', (req, res) => {
  Like.findAll({
    attributes: ['id'],
    include: [
      { model: Post, attributes: ['title'] },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbLikeData) => {
      res.json(dbLikeData);
    })
    .catch((err) => res.status(500).json(err));
});

//Add new like
router.post('/:id', (req, res) => {
  // Only be able to like posts if user is logged in
  if (req.session.user_id) {
    Like.create({
      user_id: req.session.user_id,
      post_id: req.params.id,
    })
      .then((dbLikeData) => res.json(dbLikeData))
      .catch((err) => res.status(500).json(err));
  } else {
  }
});

//delete like
router.delete('/', (req, res) => {
  Like.destroy({
    where: {
      // user_id: req.session.user_id,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    },
  })
    .then((dbLikeData) => {
      if (!dbLikeData) {
        res
          .status(404)
          .json({ message: 'No like found with these post and user id' });
        return;
      }
      res.json(dbLikeData);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
