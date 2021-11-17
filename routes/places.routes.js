const router = require("express").Router();
const Places = require("../models/places.model");

//LIST OF ALL THE PLACES
router.get("/", (req, res) => {
  Places.find()
    .then((allPlaces) => {
      console.log(allPlaces);
      res.render("places/allPlaces", {allPlaces});
    })
    .catch((err) => console.log(err));
});

//CREATE OF A NEW PLACE
router.get("/create", (req, res) => {
  res.render("places/createPlace");
});
router.post("/create", (req, res) => {
  Places.create({
    name: req.body.name,
    type: req.body.type,
    location: {type: "Point", coordinates: [req.body.longitude, req.body.latitude]},
  })
    .then((result) => {
      res.redirect("/places");
    })
    .catch((err) => console.log(err));
});

//SHOW DETAILS AND EDIT PLACES
router.get("/editPlace/:id", (req, res) => {
  Places.findById(req.params.id)
    .then((place) => {
      res.render("places/editPlace", place);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/editPlace/:id", (req, res) => {
  Places.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      type: req.body.type,
      location: {type: "Point", coordinates: [req.body.longitude, req.body.latitude]},
    },
    {new: true}
  )
    .then((result) => {
      Places.find().then((allPlaces) => {
        res.render("places/allPlaces", {allPlaces});
      });

      console.log(result);
    })
    .catch((err) => console.log(err));
});

//DELETE A PLACE
router.get("/delete/:id", (req, res) => {
  Places.findByIdAndRemove(req.params.id)
    .then(res.redirect("/places"))
    .catch((err) => console.log(err));
});

//SEND PLACES TO MAPS
router.get("/api", (req, res) => {
  Places.find()
    .then((allPlaces) => {
      res.status(200).json({places: allPlaces});
    })
    .catch((err) => console.log(err));
});
module.exports = router;
