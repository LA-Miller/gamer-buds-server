const router = require("express").Router();
const { models } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const validateJWT = require("../middleware/validate-jwt");

// User register endpoint
router.post("/register", async (req, res) => {
  let { username, email, password, isAdmin } = req.body?.user;

  const isAdminCheck = boolean;
  if(isAdmin === false || isAdmin === null) {
    isAdminCheck === false;
  }
  
  try {
    const User = await models.UserModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, 13),
      isAdmin: isAdminCheck,
    });

    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "User successfully registered",
      user: User,
      sessionToken: token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Username already in use",
      });
    } else {
      res.status(500).json({
        message: "Failed to register user",
      });
    }
  }
});

//user login endpoint
router.post("/login", async (req, res) => {
  let { username, password } = req.body.user;

  try {
    const loginUser = await models.UserModel.findOne({
      where: {
        username: username,
      },
    });

    if (loginUser) {
      let passwordComparison = await bcrypt.compare(
        password,
        loginUser.password
      );

      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        res.status(200).json({
          user: loginUser,
          message: "User successfully logged in!",
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect username or password",
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect username or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to log user in.",
    });
  }
});

// GETTING ALL THE USER INFO
router.get('/userinfo', validateJWT, async(req, res) => {
  try {
    await models.UserModel.findAll({
      include: [
        {
          model: models.PostsModel,
        }
      ]
    })
    .then(
      users => {
        res.status(200).json({
          users: users
        });
      }
    )
  } catch(err) {
    res.status(500).json({
      error: `Failed to retrieve users: ${err}`
    })
  }
})

// GETTING A SINGLE USERS INFO BY ID
router.get('/:id', validateJWT, async(req, res) => {
  let { id } = req.params;
  try {
    await models.UserModel.findAll({
      where: {
        id: id
      },
      include: [
        {
          model: models.PostsModel
        }
      ]
    })
    .then(
      user => {
        res.status(200).json({
          user: user
        });
      }
    )
  } catch(err) {
    res.status(500).json({
      error: `Failed to retrieve user`
    })
  }
})

//ADMIN DELETING A USER -- ALSO DELETES ALL OF THE USER'S POSTS
router.delete('/:id', validateJWT, async(req, res) => {
  const isAdmin = req.user.isAdmin;
  const userId = req.params.id;

  if(isAdmin) {
    try {
      const query = {
        where: {
          id: userId
        },
      };
      await models.UserModel.destroy(query);
      res.status(200).json({ message: "User removed" });
    } catch(err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(200).json({ message: "Not an Admin" });
  }
})

module.exports = router;
