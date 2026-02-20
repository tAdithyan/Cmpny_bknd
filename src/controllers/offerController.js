const Offer = require('../models/Offer');
const fs = require('fs');
const path = require('path');

exports.getOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.status(200).json({
            message: 'Success',
            data: offers
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({
                message: 'Offer not found'
            });
        }
        res.status(200).json({
            message: 'Success',
            data: offer
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.createOffer = async (req, res) => {
    try {
        const offerData = req.body;
        if (req.file) {
            offerData.image = `/uploads/${req.file.filename}`;
        }

        const offer = await Offer.create(offerData);
        res.status(201).json({
            message: 'Offer created',
            data: offer
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                message: 'Validation Error',
                error: messages
            });
        }
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.updateOffer = async (req, res) => {
    try {
        const { headline, subline, description } = req.body;
        const updateData = {};

        if (headline !== undefined && headline.trim() !== '') updateData.headline = headline;
        if (subline !== undefined && subline.trim() !== '') updateData.subline = subline;
        if (description !== undefined && description.trim() !== '') updateData.description = description;

        // Find offer first to get old image path
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({
                message: 'Offer not found'
            });
        }

        if (req.file) {
            // Delete old image if it exists
            if (offer.image) {
                const oldImagePath = path.join(__dirname, '..', '..', offer.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            message: 'Offer updated',
            data: updatedOffer
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        const offerlength = await Offer.countDocuments();
        if (offerlength === 1) {
            return res.status(400).json({
                message: 'Cannot delete last offer'
            });
        }

        if (!offer) {
            return res.status(404).json({
                message: 'Offer not found'
            });
        }

        // Delete image file if it exists
        if (offer.image) {
            const imagePath = path.join(__dirname, '..', '..', offer.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Offer.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Offer deleted',
            id: req.params.id
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};
