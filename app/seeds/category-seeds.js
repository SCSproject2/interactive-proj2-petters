const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'dogs',
    post_id: 1,
  },
  {
    category_name: 'cats',
    post_id: 3,
  },
  {
    category_name: 'small pets',
    post_id: 2,
  },
  {
    category_name: 'reptile',
    post_id: 4,
  },
  {
    category_name: 'wild',
    post_id: 3,
  },
  {
    category_name: 'fish',
    post_id: 2,
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
