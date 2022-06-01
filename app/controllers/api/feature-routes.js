const { Post, User, Comment, Category } = require('../../models');
const router = require('express').Router();

//Get a post that has the most likes
router.get('/', (req,res)=>{
    Post.findAll({
        order: [
            'likes',
            'DESC'
        ]
    })
    .then(dbPostData => {
        res.json(dbPostData[0])
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});