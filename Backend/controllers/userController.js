import User from '../Models/User.js';
import axios from 'axios';
import 'dotenv/config'
export const getAllUsers = async (req, res) => {
    try {
        const users = await User?.find();
        if (users.length > 0) {
            res.json({ users });
        } else {
            res.json({ message: 'Users list empty!' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error fetching users', error });
    }
};

export const create = async (req, res) => {
    try {
        const { username, email, channel, age, dob, social, phoneNumber,phNumber,valueReCapcha } = req.body;

        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.BackEndSecret}&response=${valueReCapcha}`);
        const data = response.data;
    
        if (data.success) {
            const user = new User({ username, email, channel, age, dob, social, phoneNumber, phNumber });
            await user.save();
            res.json(user);
        } else {
            res.status(400).json({ message: 'Recaptcha verification failed!' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error creating user', error });
    }
};

