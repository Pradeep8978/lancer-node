const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    phone: Number,
    name: String,
    pictureUrl: String,
    dob: String,
    skills: [String],
    languages: [String],
    organization: String,
    address: {
      address_line1: String,
      address_line2: String,
      city: String,
      state: String,
      pinCode: Number
    }, 
    location: {
      longitude: String,
      lattitude: String
    },
    about: String
});

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;