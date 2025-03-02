const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// get All users
const getAllUsers = async(req, res) => {
    let users;

    try {
        users = await userModel.find();
    }

    catch(err) {
        console.log(err);
    }

    if(!users || users.length === 0) {
        return res.status(404).json({message: 'No users found'});
    }
    return res.status(200).json(users);
}

exports.getAllUsers = getAllUsers;

// register user
const registerUser = async(req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        
        //check if all fields are filled
        if(!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        //check if user exists
        const existinguser = await userModel.findOne({ email });
        if(existinguser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //password validation
        if(password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        if(!/[A-Z]/.test(password)) {
            return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
        }

        if(!/[0-9]/.test(password)) {
            return res.status(400).json({ message: 'Password must contain at least one number' });
        }

        if (!/[@$!%*?&]/.test(password)) {
            return res.status(400).json({ message: 'Password must contain at least one special character (@, $, !, %, *, ?, &).' });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //create new user
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            phone
        });

        //save user
        await user.save();

        //create token
        const token = jwt.sign({ id: user._id
        }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }

}

exports.registerUser = registerUser;


// login user
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        //check if all fields are filled
        if(!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        //check if user exists
        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //create token
        const token = jwt.sign({ id: user._id
        }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.loginUser = loginUser;