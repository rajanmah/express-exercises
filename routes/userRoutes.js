///Require express
const express = require("express");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("User Request Time: ", Date.now());
  next();
});


router
  .route("/")
  .get((req, res) => {
    res.send("this is the user route");
  })
  .post((req, res) => {
    res.send("user post request");
  });

router.get("/:id", (req, res) => {
  res.send(`navigated to the user page for ${req.params.id}`);
});

router.get("/:userID/profile", (req, res) => {
  res.send(`Navigated to the user profile page for: ${req.params.userID}.`);
});

router.get("/:userID/profile/:data", (req, res) => {
  res.send(
    `Navigated to the user profile page for: ${req.params.userID}, with the data: ${req.params.data}.`
  );
});

router.post("/", (req, res) => {
  res.send({
    userName: "bob",
    desc: "recieived a POST request for user!",
  });
});


module.exports = router;