const express = require("express");
const { Store } = require("express-session");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, (req, res) => {
  let keys = [];
  let userId = [];

  req.sessionStore.all(function (err, sessions) {
    for (const [key] of Object.entries(sessions)) {
      keys.push(key);

      req.sessionStore.get(key, (err, session) => {
        // console.log(session.passport.user);
        userId += session.passport.user;
      });
    }
    console.log(userId);
    res.render("admin", {
      req: req,
      user: req.user,
      keys: keys,
    });
  });
});

router.get("/revoke/:key", ensureAuthenticated, (req, res) => {
  req.sessionStore.destroy(req.params.key, (err) => console.log(err));
  res.redirect("/admin");
});

module.exports = router;
