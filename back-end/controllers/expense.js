const path = require("path");
const Expense = require("../models/expense");
const User = require('../models/user');
const sequelize = require("../util/database");

// exports.getHomePage = (req, res, next) => {
//     res.sendFile(path.join(__dirname, "../", "frontend", "views", "homePage.html"));
//   };

exports.addExpense = async (req, res, next) => {
    const date = req.body.date;
    const category = req.body.category;
    const description = req.body.description;
    const amount = req.body.amount;

    const t = await sequelize.transaction();

    await User.update(
        {
            totalExpenses: req.user.totalExpenses + amount,
        },
        { where: { id: req.user.id } },
        { transaction: t }
    )
    .then(async(updatedUser)=>{
        await t.commit();
    })
    .catch(async(err)=>{
        await t.rollback();
    })


    Expense.create({
        date: date,
        category: category,
        description: description,
        amount: amount,
        userId: req.user.id,
      },
        { transaction: t })
        .then(async(result) => {
            await t.commit();
            res.status(200);
            res.json({ message: "Expense added successfully" });
        })
        .catch(async(err) => { 
            await t.rollback();
            console.log(err)
        });

};


exports.getAllExpenses = async(req, res, next) => {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } })
        
            res.json(expenses);
        
};

exports.deleteExpense = async(req, res, next) => {
    const id = req.params.id;
    const t = await sequelize.transaction();

    await Expense.findByPk(id)
    .then((expense) => {
        User.update(
            {
                totalExpenses: req.user.totalExpenses - expense.amount,
            },
            { where: { id: req.user.id } },
            {transaction:t}
        )
        .then(async(result)=>{
            await t.commit();
        })
        .catch(async(err)=>{
            await t.rollback();
        })
    });

    Expense.expense.destroy({ where: { id: id, userId: req.user.id } },{transaction:t})
        .then(async(result) => {
            await t.commit();
            res.statue(200).json({ message: "Expense deleted successfully" });
        })
        .catch(async(err) => {
            await t.rollback();
            console.log(err, 'error in delete expense');
        });



};
exports.editExpense = async(req, res, next) => {
    const id = req.params.id;
    const category = req.body.category;
    const description = req.body.description;
    const amount = req.body.amount;
    const t = await sequelize.transaction();

    await Expense.findByPk(id).then((expense) => {
        User.update(
            {
                totalExpenses: req.user.totalExpenses - expense.amount + amount,
            },
            { where: { id: req.user.id } },
            {transaction:t}
        )
        .then(async(result)=>{
            await t.commit();
        })
        .catch(async(err)=>{
            await t.rollback();
        })
    });


    Expense.update(
        {
            category: category,
            description: description,
            amount: amount,
        },
        { where: { id: id, userId: req.user.id } },
        {transaction:t}
    )
        .then(async(expense) => {
            await t.commit();
            res.statue(200).json({ message: "Expense edited successfully" });

        })
        .catch(async(err) => {
            await t.rollback();
            console.log(err)
        });
};