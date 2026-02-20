const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Please provide a username and password'
            });
        }

        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '30d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            message: 'Success',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};
