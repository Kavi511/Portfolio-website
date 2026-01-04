import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection URI:', process.env.MONGODB_URI?.replace(/\/\/.*@/, '//***:***@')); // Hide password
    
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Test the connection
    await mongoose.connection.db.admin().command({ ping: 1 });
    
    console.log('✅ Successfully connected to MongoDB!');
    console.log(`Database: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
};

testConnection();

