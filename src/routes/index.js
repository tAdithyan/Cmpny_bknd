const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');
const blogRoutes = require('./blog');
const uploadRoutes = require('./upload');
const offerRoutes = require('./offer');
const contactRoutes = require('./contact');
const authRoutes = require('./auth');
const dashboardRoutes = require('./dashboard');
const analyticsRoutes = require('./analytics');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /example:
 *   get:
 *     summary: Retrieve a list of examples
 *     description: Retrieve a list of examples from the server.
 *     responses:
 *       200:
 *         description: A list of examples.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/example', exampleController.getExamples);

/**
 * @swagger
 * /example:
 *   post:
 *     summary: Create a new example
 *     description: Create a new example item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the example.
 *                 example: New Example
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Example created
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: New Example
 */
router.post('/example', exampleController.createExample);

router.use('/upload', protect, uploadRoutes);
router.use('/blogs', blogRoutes);
router.use('/offers', offerRoutes);
router.use('/contacts', contactRoutes);
router.use('/auth', authRoutes);
router.use('/dashboard', protect, dashboardRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
