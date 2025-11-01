const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/database');

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    // Optional: remove old seed users
    await User.deleteMany({ email: { $in: ['student@example.com', 'instructor@example.com'] } });

    const users = [
      {
        firstName: 'Test',
        lastName: 'Student',
        username: 'test_student',
        email: 'student@example.com',
        password: 'Password123', // Will be hashed by model
        role: 'student'
      },
      {
        firstName: 'Test',
        lastName: 'Instructor',
        username: 'test_instructor',
        email: 'instructor@example.com',
        password: 'Password123',
        role: 'instructor'
      }
    ];

    await User.insertMany(users);
    console.log('🎉 Test users seeded successfully!');
    console.log('Login Credentials:');
    console.log('Student → student@example.com / Password123');
    console.log('Instructor → instructor@example.com / Password123');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
