const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userController = require("../controllers/userController");

// env variables
const dotenv = require("dotenv");
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = dotenv.config().parsed;

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },

  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const githubLogin = new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback",
  },
  function (accessToken, refreshToken, profile, cb) {
    let user = userController.getUserByGitHubIdOrCreate(profile);
    return cb(null, user);
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = (passport.use(localLogin), passport.use(githubLogin));
