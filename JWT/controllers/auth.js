const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailService");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, role: user.role, password: user.password }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
    });
};

exports.registerUser = async (req, res) => {
    const { name, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Create a new user
        const user = new User({ name, password, role });
        await user.save();

        // Send Registration Email
        const message = `Welcome to My Task Manager! Your registration is successful: ${user.name}`;
        await sendEmail({
            email: user.name,
            subject: "Registration Successful",
            message,
        });

        res.json({
            _id: user._id,
            name: user.name,
            role: user.role,
            token: generateToken(user)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.error("Error registering user:", error);
    }
};

exports.loginUser = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });
        if (user && await user.comparePassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                role: user.role,
                token: generateToken(user)
            });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.error("Error logging in user:", error);
    }
};
