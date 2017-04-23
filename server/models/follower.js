/* Mongoose is ORM, like models.py in django */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model. 
const followerSchema = new Schema({
    id: {
	type: String,
	unique: true,
	required: true,
	trim: true,
	minlength: 1,
    },
    inbox: {
	type: String,
	required: true,
	minlength: 1
    }
});

// Create model class
const ModelClass = mongoose.model('follower', followerSchema);

// Export model
module.exports = ModelClass;
