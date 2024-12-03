const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const app = express();
app.use(cors());

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const purchaseMembershipRouter = require("./routes/purchaseMember");

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders');


app.use(bodyParser.json({ extended: false }));

const frontendPath = path.join(__dirname, "../front-end");
app.use(express.static(frontendPath));

app.use(userRoute);
app.use('/expense',expenseRoute);
app.use('/purchase',purchaseMembershipRouter);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then((res)=>{
    app.listen(4000);
    console.log('server started');
})
.catch((err)=>{
    console.log(err);
})


