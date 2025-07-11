const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailService");
const dotenv = require("dotenv");
const logger = require("../utils/logger");

dotenv.config();

const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, role: user.role, password: user.password }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
    });
};

exports.registerUser = async (req, res) => {
    const { name, password, role } = req.body;

    try {
        logger.info(`Register attempt: ${name}, role: ${role}`);

        if (!["admin", "manager", "employee"].includes(role)) {
            logger.warn(`Invalid role during registration: ${role}`);
            return res.status(400).json({ message: "Invalid role provided" });
        }

        const existingUser = await User.findOne({ name });
        if (existingUser) {
            logger.warn(`Registration failed - User already exists: ${name}`);
            return res.status(400).json({ message: "User with this name already exists" });
        }

        const user = new User({ name, password, role });
        await user.save();

        const message = `Welcome to My Task Manager! Your registration is successful: ${user.name}`;
        await sendEmail({
            email: user.name,
            subject: "Registration Successful",
            message,
        });

        logger.info(`User registered successfully: ${user.name} [${user.role}]`);
        logger.info("Login attempt"); 

        res.json({
            _id: user._id,
            name: user.name,
            role: user.role,
            token: generateToken(user),
        });
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        logger.error("Some error");  
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.loginUser = async (req, res) => {
    const { name, password } = req.body;

    try {
        logger.info(`Login attempt: ${name}`);

        const user = await User.findOne({ name });
        if (user && await user.comparePassword(password)) {
            logger.info(`Login success: ${name} [${user.role}]`);
            res.json({
                _id: user._id,
                name: user.name,
                role: user.role,
                token: generateToken(user),
            });
        } else {
            logger.warn(`Login failed: Invalid credentials for ${name}`);
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        logger.error(`Error logging in user: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};