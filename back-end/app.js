const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const app = express();
app.use(cors());

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');

app.use(bodyParser.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoute);
app.use('/expense',expenseRoute);



sequelize.sync()
.then((res)=>{
    app.listen(4000);
    console.log('server started');
})
.catch((err)=>{
    console.log(err);
})


