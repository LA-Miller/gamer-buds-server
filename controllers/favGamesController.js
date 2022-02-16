const router = require("express").Router();
const { models } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

const { FavGameModel } = models;

router.post("/add", validateJWT, async (req, res) => {
  const { id } = req.user;
  const { title } = req.body;

  try {
  const added = await FavGameModel.create(
    {
      title: title,
      userId: id,
    },
  )
    res.status(200).json(added);
}
  catch(err) {
      console.log(err);
      res.status(500).json(err);
  }
});

module.exports = router;
