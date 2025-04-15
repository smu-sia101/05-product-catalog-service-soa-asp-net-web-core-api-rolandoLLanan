const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./config/seedData');
const Product = require('./models/Product');

// Load env variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Import data into database
const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing data
    console.log('Deleted all existing products');
    
    await Product.insertMany(products);
    console.log('Sample products imported successfully');
    
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data from database
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('All products deleted');
    
    process.exit();
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`);
    process.exit(1);
  }
};

// Run the appropriate function based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 