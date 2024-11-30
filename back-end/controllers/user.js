const User = require('../models/user');

exports.postAddUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    console.log(name,'name',email,'email',phone,'phone',password);
    try {
        console.log('Incoming request body:', req.body);
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            console.log('in existing user',name,'name',email,'email',phone,'phone',password);

            return res.status(400).json({ error: 'User already exists' });
            
        }
        console.log('in outer user',name,'name',email,'email',phone,'phone',password);

        const newUser = await User.create({ name, email, phone, password });
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (err) {
        console.error("Error in POST /add-user:", err);
        res.status(500).json({ error: 'An error occurred while adding the user.' });
    }
};
