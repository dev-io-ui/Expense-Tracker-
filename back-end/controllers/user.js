const User = require('../models/user');
const bcrypt = require("bcrypt");
const sequelize = require("../util/database");
const jwt = require("jsonwebtoken");

let generateAccessToken = (id, email)=> {
    return jwt.sign(
        { userId: id, email: email },
        "kjhsgdfiuiew889kbasgdfskjabsdfjlabsbdljhsd"
    );
};

const getAllUsers = (req, res, next) => {
    
    User.findAll({
      attributes: [
        [sequelize.col("name"), "name"],
        [sequelize.col("totalExpenses"), "totalExpenses"],
      ],
      order: [[sequelize.col("totalExpenses"), "DESC"]],
    }).then((users) => {
      const result = users.map((user) => ({
        name: user.getDataValue("name"),
        totalExpenses: user.getDataValue("totalExpenses"),
      }));
      res.send(JSON.stringify(result));
    });
  };


const isPremiumUser = (req, res, next) => {
    if (req.user.isPremiumUser) {
        return res.json({ isPremiumUser: true });
    }
};


const postUserSignUp = async (req, res) => {
    const { name, email, phone, password } = req.body;
    console.log(name, 'name', email, 'email', phone, 'phone', password);
    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            console.log('in existing user', name, 'name', email, 'email', phone, 'phone', password);

            return res.status(400).json({ error: 'User already exists' });

        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User added successfully', user: newUser });
    }
    catch (err) {
        console.error("Error in POST /add-user:", err);
        res.status(500).json({ error: 'An error occurred while adding the user.' });
    }
};



const postUserLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ where: { email: email } })
        .then((user) => {
            if (user) {

                bcrypt.compare(password, user.password, async (err, result) => {

                    if (err) {
                        return res.status(500).json({ error: 'something went  wrong' });
                    }

                    if (result == true) {
                        return res.status(200).json({
                            success: true,
                            message: "Login Successful!",
                            token: generateAccessToken(user.id, user.email),
                        });
                    }
                    else {
                        res.status(401).json({ error: 'Wrong Password' });
                    }
                });

            } else {
                return res.status(404).json({ error: 'User not found' });

            }
        });
};

module.exports = {
    isPremiumUser,
    generateAccessToken,
    postUserSignUp,
    postUserLogin,
    getAllUsers
  };