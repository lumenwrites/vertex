const mongoose =  require('mongoose');
const User = require('./models/user');

// Connect to db.
mongoose.Promise = global.Promise;
var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/vertex';
mongoose.connect(MONGO_DB_URL, (error) => {
    if (error) { throw error; }
    console.log("Connected to the db at " + MONGO_DB_URL + "!");
});

/* The first arg is the path to nodejs,
   and the second arg is the location of the script you're executing. */
const args = process.argv.slice(2);

if (args[0] == "createsuperuser") {
    const email = args[1];
    const password = args[2];
    console.log(email)
    console.log(password)

    const user = new User({
	email: email,
	password: password
    });

    user.save((error, user) => {
	if (error) { throw error; }
	console.log("Created user " + JSON.stringify(user) + "!");
	mongoose.connection.close();
    });
}




