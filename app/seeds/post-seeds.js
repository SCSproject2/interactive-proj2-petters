const { Post } = require('../models');

const postdata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 6,
    user_id: 7
  },
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 1,
    user_id: 6
  },
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 2,
    user_id: 5
  },
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 1,
    user_id: 3
  },
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 3,
    user_id: 1
  },
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 5,
    user_id: 10
  },
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 4,
    user_id: 10
  },
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 4,
    user_id: 7
  },
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 2,
    user_id: 4
  },
  {
    title: 'Donec posuere metus vitae ipsum.',
    body: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    category_id: 1,
    user_id: 9
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
