const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact form management
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Retrieve a list of contact submissions
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: A list of contacts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 */
router.get('/', contactController.getContacts);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact submission
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 */
router.post('/', contactController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact submission
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact deleted
 */
router.delete('/:id', contactController.deleteContact);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - service
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         company:
 *           type: string
 *         phone:
 *           type: string
 *         service:
 *           type: string
 *         message:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */
