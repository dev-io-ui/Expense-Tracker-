const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const app = express();
app.use(cors());

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');

const User = require('./models/user');
const Expense = require('./models/expense');


app.use(bodyParser.json({ extended: false }));

// Define the correct path to the frontend folder
const frontendPath = path.join(__dirname, "../front-end");

// Serve static files (CSS, JS, images) from the frontend folder
app.use(express.static(frontendPath));

// Route to serve homePage.html


app.use(userRoute);
app.use('/expense',expenseRoute);


User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
.then((res)=>{
    app.listen(4000);
    console.log('server started');
})
.catch((err)=>{
    console.log(err);
})


