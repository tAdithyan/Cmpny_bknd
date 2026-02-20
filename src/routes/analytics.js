const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Visitor tracking and analytics
 */

/**
 * @swagger
 * /analytics/track-visitor:
 *   post:
 *     summary: Store visitor location data
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               displayName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tracked successfully
 */
router.post('/track-visitor', analyticsController.trackVisitor);

module.exports = router;
