// C:\\backend\\models\\user.js

const mongoose = require('mongoose');

// Step 1: Define the schema (structure of your User document)
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Step 2: Create the model from the schema
const User = mongoose.model('User', UserSchema);

// Step 3: Export the User model
module.exports = User;
