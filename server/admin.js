const mongoose =  require('mongoose');
const User = require('./models/user');

// Connect to db.
mongoose.Promise = global.Promise;
var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/vertex';
console.log("Connecting to the db at " + MONGO_DB_URL);
mongoose.connect(MONGO_DB_URL, (error) => {
    if (error) {
	console.error('Please make sure Mongodb is installed and running!'); 
	throw error;
    }
    console.log("Connected to the db at " + MONGO_DB_URL + "!");
});


const email = "email@hello.com";
const password = "hunter";

const user = new User({
    email: email,
    password: password
});


user.save()
