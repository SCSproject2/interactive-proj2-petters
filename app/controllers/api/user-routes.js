const router = require('express').Router();
const { User, Post, Category } = require('../../models');

//Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(500).json(err);
        });
})

//Get one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'body',
                    'category_id'
                ],
                include: {
                    model: Category,
                    attributes: ['category_name']
                }
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'created_at'
                ],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
        ]
    })
    .then(dbUserData=>{
        if(!dbUserData){
            res.status(400).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});

// Create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData=>{
        req.session.save(()=>{
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err=> {
        res.status(500).json(err);
    });
});

// Allow users to login
router.post('/login', (req, res) => { });

// Terminate sessions and redirect to main page
router.post('/logout', (req, res) => { });

//update user

//delete user

module.exports = router;
