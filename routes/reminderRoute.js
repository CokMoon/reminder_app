const express = require("express");
const reminderController = require("../controllers/reminderController");
const { ensureAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

// case 1: user goes to localhost:8080/ -> Homepage/Marketing Page
// router.get("/", (req, res) => {
//   res.send("Welcome to our landing page. Mareting content goes here");
// });

// case 2: user goes to localhost:8080/reminder -> show a list of reminders
router.get("/", ensureAuthenticated, reminderController.list);

// case 3: user goes to localhost:8080/reminder/new -> show a CREATE REMINDER PAGE
router.get("/new", ensureAuthenticated, reminderController.new);

// case 4: user SENT NEW REMINDER DATA TO USE (CREATING A REMINDER)
router.post("/", ensureAuthenticated, reminderController.create);

// case 5: user want to SEE an individual reminder
router.get("/:id", ensureAuthenticated, reminderController.listOne);

// case 6: user want to EDIT an individual remdiner
router.get("/:id/edit", ensureAuthenticated, reminderController.edit);

// case 7: user clicks the UPDATE BUTTON form case 6, and expects their reminder to be updated
router.post("/update/:id", ensureAuthenticated, reminderController.update);

// case 8: user clicks the Delete and we expect the reminder to get deleted
router.post("/delete/:id", ensureAuthenticated, reminderController.delete);

module.exports = router;
