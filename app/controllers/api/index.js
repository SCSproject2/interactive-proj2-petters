const router = require('express').Router();

const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const categoryRoutes = require('./category-routes');
// const { route } = require('../search-routes');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
