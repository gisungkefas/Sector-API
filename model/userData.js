const mongoose = require('mongoose');



// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    selectedCategory: { type: String, required: true },
    selectedSector: { type: String, required: true },
    agreeToTerms: { type: Boolean, required: true },
  });
  
  const User = mongoose.model('user', userSchema);

  module.exports = User