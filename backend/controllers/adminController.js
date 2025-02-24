const adminModel = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//get all admins
const getAllAdmins = async(req, res) => {
    try {
        const admin = await adminModel.find();
        if (!admin || admin.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json(admin);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllAdmins = getAllAdmins;

//register admin
const registerAdmin = async(req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        //check if all fields are filled
        if(!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        //check if admin exists
        const existingadmin = await adminModel.findOne({ email });
        if(existingadmin) {
            return res.status(400).json({ message: 'Admin already exists' });
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
        
        //create new admin
        const admin = new adminModel({
            name,
            email,
            password: hashedPassword,
            phone
        });

        //save admin
        await admin.save();

        //create token
        const token = jwt.sign({ id: admin._id
        }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, phone: admin.phone } });

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.registerAdmin = registerAdmin;


//login admin
const loginAdmin = async(req, res) => {
    try {
        const { email, password } = req.body;

        //check if all fields are filled
        if(!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        //check if admin exists
        const admin = await adminModel.findOne({ email });
        if(!admin) {
            return res.status(400).json({ message: 'Admin does not exist' });
        }

        //check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //create token
        const token = jwt.sign({ id: admin._id
        }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, phone: admin.phone } });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.loginAdmin = loginAdmin;
