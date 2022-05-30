const seedUsers = require('./user-seeds');
// const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const seedCategories = require('./category-seeds');

const sequelize = require('../../app/config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  await seedCategories();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  process.exit(0);
};

seedAll();
