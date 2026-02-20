const Blog = require('../models/Blog');
const Offer = require('../models/Offer');
const Contact = require('../models/Contact');
const Visitor = require('../models/Visitor');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
    try {
        console.log("Starting dashboard stats fetch...");

        let blogCount = 0;
        let offerCount = 0;
        let contactCount = 0;
        let totalVisitors = 0;
        let visitsData = [{ name: 'No Data', visitors: 0 }];
        let pageViewsData = [{ name: 'No Data', views: 0 }];

        // 1. Fetch Counts
        try {
            blogCount = await Blog.countDocuments();
            offerCount = await Offer.countDocuments();
            contactCount = await Contact.countDocuments();
            totalVisitors = await Visitor.countDocuments();
        } catch (err) {
            console.error("Error fetching counts:", err.message);
        }

        // 2. Aggregate City Stats
        try {
            const cityStats = await Visitor.aggregate([
                {
                    $group: {
                        _id: '$city',
                        visitors: { $sum: 1 }
                    }
                },
                { $sort: { visitors: -1 } },
                { $limit: 6 }
            ]);

            if (cityStats.length > 0) {
                visitsData = cityStats.map(item => ({
                    name: item._id || 'Unknown',
                    visitors: item.visitors
                }));
            }
        } catch (err) {
            console.error("Error aggregating city stats:", err.message);
        }

        // 3. Aggregate Weekly Stats
        try {
            const last7Days = await Visitor.aggregate([
                {
                    $match: {
                        timestamp: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: '%a', date: '$timestamp' } },
                        views: { $sum: 1 },
                        sortDate: { $first: '$timestamp' }
                    }
                },
                { $sort: { sortDate: 1 } }
            ]);

            if (last7Days.length > 0) {
                pageViewsData = last7Days.map(item => ({
                    name: item._id,
                    views: item.views
                }));
            }
        } catch (err) {
            console.error("Error aggregating weekly stats:", err.message);
        }

        res.status(200).json({
            success: true,
            data: {
                blogs: blogCount,
                offers: offerCount,
                contacts: contactCount,
                totalVisitors: totalVisitors || 0,
                growth: 100,
                visitsData,
                pageViewsData
            }
        });

    } catch (error) {
        console.error("Fatal Dashboard Error:", error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
