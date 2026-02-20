const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = conn.connections[0].readyState;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        throw error; // ❌ DO NOT use process.exit
    }
};

module.exports = connectDB;