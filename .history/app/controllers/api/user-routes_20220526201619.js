const router = require('express').Router();
const { User } = require('../../models');

// Create a new user using the form input values from the login page (template)
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Allow users to login
router.post('/login', (req, res) => {});

// Terminate sessions and redirect to main page
router.post('/logout', (req, res) => {});

module.exports = router;
