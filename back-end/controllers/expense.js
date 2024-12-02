const path = require("path");
const Expense = require("../models/expense");
const database = require("../util/database");

exports.addExpense = (req, res, next) => {
  const date = req.body.date;
  const category = req.body.category;
  const description = req.body.description;
  const amount = req.body.amount;
  Expense.create({
    date: date,
    category: category,
    description: description,
    amount: amount,
  })
    .then((result) => {
      res.status(200);
      res.json({message :"Expense added successfully"});
    })
    .catch((err) => console.log(err));
};
exports.getAllExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteExpense = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Expense.findByPk(id)
    .then((expense) => {
       expense.destroy();
      res.json({message :"Expense deleted successfully"});
    })
    .catch((err) => console.log(err));
};
exports.editExpense = (req, res, next) => {
  const id = req.params.id;
  const category = req.body.category;
  const description = req.body.description;
  const amount = req.body.amount;
 
  Expense.findByPk(id)
    .then((expense) => {
      expense.category = category;
      expense.description = description;
      expense.amount = amount;
     expense.save();

     res.json({message :"Expense edited successfully"});

    })
    .catch((err) => console.log(err));
};