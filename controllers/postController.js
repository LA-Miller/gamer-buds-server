const router = require("express").Router();
const { models } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

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

module.exports = router;