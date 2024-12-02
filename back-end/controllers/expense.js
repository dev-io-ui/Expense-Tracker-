const path = require("path");
const Expense = require("../models/expense");
const database = require("../util/database");


// exports.getHomePage = (req, res, next) => {
//     res.sendFile(path.join(__dirname, "../", "frontend", "views", "homePage.html"));
//   };

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
        userId: req.user.id,
    })
        .then((result) => {
            res.status(200);
            res.json({ message: "Expense added successfully" });
        })
        .catch((err) => console.log(err));
};
exports.getAllExpenses = (req, res, next) => {
    Expense.findAll({ where: { userId: req.user.id } })
        .then((expenses) => {
            res.json(expenses);
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.deleteExpense = (req, res, next) => {
    const id = req.params.id;
   

    Expense.expense.destroy({ where: { id: id, userId: req.user.id } })
        .then((result) => {
            res.statue(200).json({ message: "Expense deleted successfully" });
        })
        .catch((err) => {
            console.log(err, 'error in delete expense');
        });



};
exports.editExpense = (req, res, next) => {
    const id = req.params.id;
    const category = req.body.category;
    const description = req.body.description;
    const amount = req.body.amount;

    Expense.update(
        {
            category: category,
            description: description,
            amount: amount,
        },
        { where: { id: id, userId: req.user.id } }
    )
        .then((expense) => {
            res.statue(200).json({ message: "Expense edited successfully" });

        })
        .catch((err) => console.log(err));
};