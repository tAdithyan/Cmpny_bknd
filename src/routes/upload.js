const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middlewares/upload');

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload operations
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filePath:
 *                   type: string
 *       400:
 *         description: Bad request (no file or invalid file type)
 */
router.post('/', upload.single('image'), uploadController.uploadImage);

module.exports = router;
