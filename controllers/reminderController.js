const findReminder = (reminderId, user) => {
  const reminderToFind = reminderId;
  const searchResult = user.reminders.find(
    (reminder) => reminder.id == reminderToFind
  );
  return searchResult;
};

const reminderController = {
  list: (req, res) => {
    console.log(req.user.reminder);

    res.render("reminder/index", {
      name: req.user.name,
      reminders: req.user.reminders,
    });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  create: (req, res) => {
    const reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminder");
  },

  listOne: (req, res) => {
    const searchResult = findReminder(req.params.id, req.user);
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.redirect("/reminder");
    }
  },

  edit: (req, res) => {
    const searchResult = findReminder(req.params.id, req.user);
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    const searchResultIndex = req.user.reminders.indexOf(
      findReminder(req.params.id, req.user)
    );
    const updatedReminder = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed === "true",
    };

    req.user.reminders[searchResultIndex] = updatedReminder;
    res.redirect("/reminder");
  },

  delete: (req, res) => {
    req.user.reminders = req.user.reminders.filter(
      (reminder) => !(reminder.id == req.params.id)
    );
    res.redirect("/reminder");
  },
};

module.exports = reminderController;
