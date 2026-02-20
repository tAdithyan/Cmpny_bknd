const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://isuperhero16_db_user:T4w2oDiCVenwxXf4@advertaising.nlphfhj.mongodb.net/?appName=advertaising');

        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD || 'password123';

        // Check if admin already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        await User.create({
            username,
            password
        });

        console.log('Admin user created successfully!');
        console.log('Username: admin');
        console.log('Password: password123');
        console.log('IMPORTANT: Please change this password after logging in.');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
