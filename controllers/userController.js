const router = require('express').Router();
const { UserModel } = require("../models");

router.post('/register', async (req,res) => {
    UserModel.create({
        username: "testUsername01",
        email: "testEmail01@email.com",
        password: "testPassword01"
    })
})

module.exports = router;