const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserByGitHubIdOrCreate = (profile) => {
  try {
    let user = userModel.findById(profile.id);
    return user;
  } catch (err) {
    const newUser = {
      id: profile.id,
      name: profile.username,
      email: profile.email,
      role: "user",
      reminders: [],
    };
    return userModel.addNewUser(newUser);
  }
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserByGitHubIdOrCreate,
  getUserById,
};
