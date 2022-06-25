const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const reminderController = require("./controllers/reminder_controller");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");

// case 1: user goes to localhost:8080/ -> Homepage/Marketing Page
app.get("/", (req, res) => {
  res.send("Welcome to our landing page. Mareting content goes here");
});

// case 2: user goes to localhost:8080/reminder -> show a list of reminders
app.get("/reminder", reminderController.list);

// case 3: user goes to localhost:8080/reminder/new -> show a CREATE REMINDER PAGE
app.get("/reminder/new", reminderController.new);

// case 4: user SENT NEW REMINDER DATA TO USE (CREATING A REMINDER)
app.post("/reminder", reminderController.create);

// case 5: user want to SEE an individual reminder
app.get("/reminder/:id", reminderController.listOne);

// case 6: user want to EDIT an individual remdiner
app.get("/reminder/:id/edit", reminderController.edit);

// case 7: user clicks the UPDATE BUTTON form case 6, and expects their reminder to be updated
app.post("/reminder/update/:id", reminderController.update);

// case 8: user clicks the Delete and we expect the reminder to ge deleted
app.post("/reminder/delete/:id", reminderController.delete);

// localhost:8080
app.listen(8080);
