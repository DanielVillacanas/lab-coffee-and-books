const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const placesRoutes = require("../routes/places.routes");
router.use("/places", placesRoutes);

module.exports = router;
