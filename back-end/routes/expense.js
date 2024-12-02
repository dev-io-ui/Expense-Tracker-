const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");
const userAuthentication = require("../middleware/auth");
router.use(express.static("frontend"));


// router.get('/',expenseController.getHomePage);
router.get("/getAllExpenses", userAuthentication,expenseController.getAllExpenses);
router.get("/deleteExpense/:id", userAuthentication,expenseController.deleteExpense);
router.post("/addExpense", userAuthentication,expenseController.addExpense);
router.post("/editExpense/:id", userAuthentication,expenseController.editExpense);




module.exports = router;