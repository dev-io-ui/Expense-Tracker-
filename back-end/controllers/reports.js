const path = require("path");
const Expense = require("../models/expense");
const { Op } = require("sequelize");


exports.dailyReports = async (req, res, next) => {
  try {
    const date = req.body.date;
    const expenses = await Expense.findAll({
      where: { date: date, userId: req.user.id },
    });
    return res.send(expenses);
  } catch (error) {
    console.log(error);
  }
};
exports.monthlyReports = async (req, res, next) => {
  try {
    const month = req.body.month;
    const expenses = await Expense.findAll({
      where: {
        date: {
          [Op.like]: `%-${month}-%`,
        },
        userId: req.user.id,
      },
      raw: true,
    });
    return res.send(expenses);
  } catch (error) {
    console.log(error);
  }
};