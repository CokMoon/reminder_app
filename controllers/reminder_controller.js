const Database = require("../database");

const findReminder = (reminderId) => {
  const reminderToFind = reminderId;
  const searchResult = Database.cindy.reminders.find(
    (reminder) => reminder.id == reminderToFind
  );
  return searchResult;
};

const reminderController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: Database.cindy.reminders });
  },
  new: (req, res) => {
    res.render("reminder/create");
  },
  create: (req, res) => {
    const reminder = {
      id: Database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    Database.cindy.reminders.push(reminder);
    res.redirect("/reminder");
  },
  listOne: (req, res) => {
    const searchResult = findReminder(req.params.id);
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.redirect("/reminder");
    }
  },
  edit: (req, res) => {
    const searchResult = findReminder(req.params.id);
    res.render("reminder/edit", { reminderItem: searchResult });
  },
  update: (req, res) => {
    const searchResultIndex = Database.cindy.reminders.indexOf(
      findReminder(req.params.id)
    );
    const updatedReminder = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed === "true",
    };

    Database.cindy.reminders[searchResultIndex] = updatedReminder;
    res.redirect("/reminder");
  },
  delete: (req, res) => {
    Database.cindy.reminders = Database.cindy.reminders.filter(
      (reminder) => !(reminder.id == req.params.id)
    );
    res.redirect("/reminder");
  },
};

module.exports = reminderController;
