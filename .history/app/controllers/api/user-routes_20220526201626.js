const router = require('express').Router();
const { User } = require('../../models');

// Create a new user using the form input values from the login page (template)
router.post('/', (req, res) => {});

// Allow users to login
router.post('/login', (req, res) => {});

// Terminate sessions and redirect to main page
router.post('/logout', (req, res) => {});

module.exports = router;
