const Visitor = require('../models/Visitor');

// @desc    Track visitor location
// @route   POST /api/analytics/track-visitor
// @access  Public
exports.trackVisitor = async (req, res) => {
    try {
        const { city } = req.body;

        if (!city) {
            return res.status(400).json({ success: false, message: 'City is required' });
        }

        const visitor = await Visitor.create({ city });

        res.status(201).json({
            success: true,
            data: visitor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error tracking visitor location',
            error: error.message
        });
    }
};
