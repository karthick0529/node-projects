const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const generateToken = (user) => {
    return jwt.sign({id: user._id, name: user.name, role: user.role, password: user.password},process.env.JWT_SECRET, {
        expiresIn : "1hr",
    });  
}

exports.registerUser = async (req, res) => {
    const { name, password,role } = req.body;
    const user = new User({name, password,role });
    await user.save();
    res.json({
        _id: user._id,
        name: user.name,
        role: user.role,
        token: generateToken(user)
    })
}

exports.loginUser = async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if(user && await user.comparePassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            role: user.role,
            token: generateToken(user)
        })
    }else {
        res.status(401).json({message: "Invalid username or password"})
        throw new Error("Invalid username or password");
    }
};