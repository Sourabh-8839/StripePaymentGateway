const mongoose = require('mongoose');

const Connection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/sourabh');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error while connecting to the database:', error.message);
  }
};

module.exports = Connection;
