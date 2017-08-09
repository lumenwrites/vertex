/* Mongoose is ORM, like models.py in django */
const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model. 
const userSchema = new Schema({
    email: {
	type: String,
	unique: true,
	required: true,
	trim: true,
	lowercase: true,
	minlength: 1,
	validate: {
	    validator: validator.isEmail,
	    message: '{VALUE} is not a valid email'
	}
    },
});

// Create model class
const ModelClass = mongoose.model('subscriber', userSchema);

// Export model
module.exports = ModelClass;
