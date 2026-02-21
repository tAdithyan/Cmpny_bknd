const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../src/config/swagger');
const routes = require('../src/routes');
const connectDB = require('../src/config/db');
require('dotenv').config();

const app = express();

// --------------------
// Database Connection (Safe for Serverless)
// --------------------
let isConnected = false;

const connectDatabase = async () => {
    if (isConnected) return;

    try {
        await connectDB();
        isConnected = true;
        console.log("Database Connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error; // Let Vercel handle error properly
    }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (safe version)
app.use('/uploads', express.static('uploads'));

// Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect DB before routes
app.use(async (req, res, next) => {
    await connectDatabase();
    next();
});

// Routes
app.use('/api', routes);

// Base route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

module.exports = app;