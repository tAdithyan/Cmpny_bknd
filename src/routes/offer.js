const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const upload = require('../middlewares/upload');

/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: Offer management
 */

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Retrieve a list of offers
 *     tags: [Offers]
 *     responses:
 *       200:
 *         description: A list of offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Offer'
 */
router.get('/', offerController.getOffers);

/**
 * @swagger
 * /offers/{id}:
 *   get:
 *     summary: Get an offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The offer ID
 *     responses:
 *       200:
 *         description: Offer details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Offer'
 */
router.get('/:id', offerController.getOfferById);

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Create a new offer
 *     tags: [Offers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - headline
 *               - description
 *               - image
 *             properties:
 *               headline:
 *                 type: string
 *               subline:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Offer created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Offer'
 */
router.post('/', upload.single('image'), offerController.createOffer);

/**
 * @swagger
 * /offers/{id}:
 *   put:
 *     summary: Update an offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The offer ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               headline:
 *                 type: string
 *               subline:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Offer updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Offer'
 */
router.put('/:id', upload.single('image'), offerController.updateOffer);

/**
 * @swagger
 * /offers/{id}:
 *   delete:
 *     summary: Delete an offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The offer ID
 *     responses:
 *       200:
 *         description: Offer deleted
 */
router.delete('/:id', offerController.deleteOffer);

module.exports = router;
