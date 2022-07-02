const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.render("login");
});

// router.get("/reminder", ensureAuthenticated, (req, res) => {
//   res.render("dashboard", {
//     user: req.user,
//   });
// });

module.exports = router;
