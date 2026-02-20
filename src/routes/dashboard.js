const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin dashboard statistics
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard overview statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 */
router.get('/stats', protect, dashboardController.getStats);

module.exports = router;
