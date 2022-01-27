const router = require("express").Router();
const { models } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

// CREATE POST
router.post('/create', validateJWT, async(req, res) => {
    const { game, content } = req.body.post;

    try {
        await models.PostsModel.create({
            game: game,
            content: content,
            userId: req.user.id
        })
        .then(
            post => {
                res.status(201).json({
                    post: post,
                    message: "Post Created"
                })
            }
        )
    } catch(err) {
        res.status(500).json({
            error: `Failed to create post: ${err}`
        })
    }
})

// GET ALL POSTS
router.get('/', validateJWT, async( req, res ) => {
    try {
        const userPosts = await models.PostsModel.findAll();
        res.status(200).json(userPosts);
    } catch(err) {
        res.status(500).json({ error: err });
    }
})

// UPDATE A POST BY A USER
router.put("/update/:postId", validateJWT, async(req,res) => {
    const { game, content } = req.body.post;
    const postId = req.params.postId;
    const userId = req.user.id

    const query = {
        where: {
            id: postId,
            userId: userId
        },
        
    }
    console.log(userId);
    const updatePost = {
        game: game,
        content: content
    }
    try {
        const update = await models.PostsModel.update(updatePost, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({ error: err });
    }
})

// DELETE INDIVIDUAL POST OF A USER
router.delete("/:id", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;

    try {
        const query = {
            where: {
                id: postId,
                userId: userId,
            },
        };
        await models.PostsModel.destroy(query);
        res.status(200).json({ message: "Post Removed" });
    } catch(err) {
        res.status(500).json({ error: err }); 
    }
})

module.exports = router;