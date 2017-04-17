const Subscriber = require('../models/subscriber');

exports.subscribe = function (req, res, next) {
    const email = req.body.email;
    console.log("Subscriber's email " + email);

    // Search for a subscriber with a given email
    Subscriber.findOne({email:email}, function(err, existingSubscriber){
	if (err) { return next(err); }

	// If a subscriber does exit - return an error
	if (existingSubscriber) {
	    return res.status(422).send({
		error:'Already subscribed!'
	    });
	}

	// If a subscriber doesn't exist - create and save subscriber record
	const subscriber = new Subscriber({
	    email: email
	});
	
	subscriber.save(function(err){
	    //This is a callback that's being caleld once subscriber is saved
	    if (err) { return next(err); }
	    return res.send({
		error:'Subscribed!'
	    });
	});
    });
}
