const router = require('express').Router();
const { Post, User, Category } = require('../../models');

//Get all posts
router.get('/', (req, res)=>{
    Post.findAll({
        attributes: [
            'id',
            'title',
            'body'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
    .then(dbPostData=> res.json(dbPostData))
    .catch(err=> {
        res.status(500).json(err);
    });
});

//Get one post
router.get('/:id', (req,res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'body'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]

    })
    .then(dbPostData=>{
        if(!dbPostData){
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});

// Create a new post
router.post('/', (req, res) => {

});

// Delete a post
router.delete('/:id', (req, res) => {});

// Update a post
router.put('/:id', (req, res) => {});

module.exports = router;
