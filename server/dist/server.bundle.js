/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	module.exports = {
	    secret: 'asdfsdfsf',
	    about: "Hello!"
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _mongoose = __webpack_require__(1);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var postSchema = new Schema({
	    slug: { type: 'String', required: true },
	    body: { type: 'String', required: true },
	    tags: [String],
	    category: { type: 'String' },
	    published: { type: 'Boolean', default: true },
	    dateAdded: { type: 'Date', default: Date.now, required: true }
	});
	
	exports.default = _mongoose2.default.model('Post', postSchema);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	/* Mongoose is ORM, like models.py in django */
	var mongoose = __webpack_require__(1);
	var validator = __webpack_require__(8);
	var Schema = mongoose.Schema;
	var bcrypt = __webpack_require__(5);
	
	// Define model. 
	var userSchema = new Schema({
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
				password: {
							type: String,
							required: true,
							minlength: 4
				},
				tokens: [{
							access: {
										type: String,
										required: true
							},
							token: {
										type: String,
										required: true
							}
				}]
	});
	
	// On save hook, encrypt password
	// Before saving a model, run this function
	userSchema.pre('save', function (next) {
				// get access to the user model. User is an instance of the user model.
				var user = this;
	
				// generate a salt, then run callback.
				bcrypt.genSalt(10, function (err, salt) {
							if (err) {
										return next(err);
							}
							// hash(encrypt) the password using the salt
							bcrypt.hash(user.password, salt, null, function (err, hash) {
										if (err) {
													return next(err);
										}
										// override plain text password with encrypted password
										user.password = hash;
										next();
							});
				});
	});
	
	// This is like defining a function on the model in models.py
	userSchema.methods.comparePassword = function (candidatePassword, callback) {
				bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
							if (err) {
										return callback(err);
							}
							callback(null, isMatch);
				});
	};
	
	// Create model class
	var ModelClass = mongoose.model('user', userSchema);
	
	// Export model
	module.exports = ModelClass;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("bcrypt-nodejs");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("passport-jwt");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("validator");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _express = __webpack_require__(0);
	
	var router = new _express.Router();
	
	var passport = __webpack_require__(6);
	var authControllers = __webpack_require__(20);
	var passportService = __webpack_require__(28);
	
	var requireAuth = passport.authenticate('jwt', { session: false });
	var requireSignin = passport.authenticate('local', { session: false });
	
	// Make every request go through the passport authentication check:
	router.route('/').get(requireAuth, function (req, res) {
	    res.send({ message: 'Successfully accessed protected API!' });
	});
	
	/* Take a request from a url and send a response. */
	router.route('/join').post(authControllers.signup);
	router.route('/login').post(requireSignin, authControllers.signin);
	
	exports.default = router;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(0);
	
	var _feed = __webpack_require__(21);
	
	var FeedController = _interopRequireWildcard(_feed);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Posts
	router.route('/feed/posts.atom').get(FeedController.getFeed);
	
	exports.default = router;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(0);
	
	var _ostatus = __webpack_require__(22);
	
	var OStatusControllers = _interopRequireWildcard(_ostatus);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all OStatus
	router.route('/.well-known/host-meta').get(OStatusControllers.hostMeta);
	router.route('/.well-known/webfinger?resource=acct:lumen@lumenwrites.com').get(OStatusControllers.webFingerAccount);
	
	router.route('/@lumen.feed').get(OStatusControllers.postStream);
	/* router.route('/feeds/posts.atom').ostatus(OStatusControllers.createOStatus);*/
	
	exports.default = router;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(0);
	
	var _post = __webpack_require__(23);
	
	var PostController = _interopRequireWildcard(_post);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Posts
	router.route('/posts').get(PostController.getPosts);
	
	// Get one post by cuid
	router.route('/posts/:cuid').get(PostController.getPost);
	
	// Add a new Post
	router.route('/posts').post(PostController.createPost);
	
	// Delete a post by cuid
	router.route('/posts/:cuid').delete(PostController.deletePost);
	
	router.route('/test').get(PostController.test);
	router.route('/categories').get(function (req, res) {
	  return res.send({ hi: "Hello!" });
	});
	
	exports.default = router;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(0);
	
	var _settings = __webpack_require__(24);
	
	var SettingsController = _interopRequireWildcard(_settings);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Settingss
	router.route('/settings').get(SettingsController.about);
	
	exports.default = router;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(0);
	
	var _subscriber = __webpack_require__(25);
	
	var SubscriberControllers = _interopRequireWildcard(_subscriber);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Posts
	router.route('/subscribe').post(SubscriberControllers.subscribe);
	
	exports.default = router;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var jwt = __webpack_require__(31);
	var config = __webpack_require__(2);
	var User = __webpack_require__(4);
	
	function tokenForUser(user) {
					// sub means subject. a property describing who it is about
					// encoding it with a secret random string
					var timestamp = new Date().getTime();
					// iat - issued at time
					return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
	}
	
	//sign in view
	exports.signin = function (req, res, next) {
					// email/pass is already checked, here I just give user a token.
					// passport has already atteched user object to the request
					console.log("Email/Pass is correct, returning token ");
					res.send({ token: tokenForUser(req.user) });
	};
	
	exports.signup = function (req, res, next) {
					var email = req.body.email;
					var password = req.body.password;
	
					if (!email || !password) {
									return res.status(422).send({
													error: 'Provide email and password'
									});
					}
					// Search for a user with a given email
					User.findOne({ email: email }, function (err, existingUser) {
									if (err) {
													return next(err);
									}
	
									// If a user does exit - return an error
									if (existingUser) {
													return res.status(422).send({
																	error: 'Email is in use'
													});
									}
	
									// If a user doesn't exist - create and save user record
									var user = new User({
													email: email,
													password: password
									});
	
									user.save(function (err) {
													//This is a callback that's being caleld once user is saved
													if (err) {
																	return next(err);
													}
	
													// If there's no errors - user is successfully saved
													// Send a responce indicating that user has been created
													/* res.json(user);*/
													//  res.send({success:'true'});
													res.send({ token: tokenForUser(user) });
									});
					});
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
				value: true
	});
	exports.getFeed = getFeed;
	
	var _feed = __webpack_require__(30);
	
	var _feed2 = _interopRequireDefault(_feed);
	
	var _post = __webpack_require__(3);
	
	var _post2 = _interopRequireDefault(_post);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var feed = new _feed2.default({
				title: 'Lumen Writes',
				description: 'New posts from Lumen Writes',
				id: 'http://lumenwrites.com/',
				link: 'http://lumenwrites.com/',
				image: 'http://example.com/image.png',
				// updated: new Date(2013, 06, 14), // optional, default = today 
	
				author: {
							name: 'Lumen Writes',
							email: 'lumenwries@gmail.com',
							link: 'http://lumenwrites.com/'
				}
	});
	
	function getFeed(req, res) {
				var filter = {};
				if (req.query.tag) {
							var tag = req.query.tag;
							console.log("Posts filtered by tag: " + tag);
							filter = { tags: { $all: tag } };
				}
	
				_post2.default.find(filter).sort('-dateAdded').exec(function (err, posts) {
							if (err) {
										res.status(500).send(err);
							}
	
							posts.forEach(function (post) {
										var link = "http://lumenwrites.com/post" + post.slug;
										feed.addItem({
													title: post.body,
													id: link,
													link: link,
													description: post.body,
													author: [{
																name: 'Lumen Writes',
																email: 'lumenwries@gmail.com',
																link: 'http://lumenwrites.com/'
													}],
													date: post.dateAdded
										});
							});
							res.type("application/xml");
							res.send(feed.rss2());
				});
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getPosts = getPosts;
	exports.createPost = createPost;
	exports.hostMeta = hostMeta;
	exports.webFingerAccount = webFingerAccount;
	exports.postStream = postStream;
	var HOST_META = {
	    "links": [{
	        "rel": "lrdd",
	        "type": "application/jrd+json",
	        "template": "http://lumenwrites.com/.well-known/webfinger?resource=acct:{uri}"
	    }, {
	        "rel": "lrdd",
	        "type": "application/json",
	        "template": "http://lumenwrites.com/.well-known/webfinger?resource=acct:{uri}"
	    }, {
	        "rel": "lrdd",
	        "type": "application/xrd+xml",
	        "template": "http://lumenwrites.com/.well-known/webfinger?resource=acct:{uri}"
	    }]
	};
	
	var LUMEN = {
	    "subject": "acct:lumen@lumenwrites.com",
	    "aliases": ["https://lumenwrites.com"],
	    "links": [{
	        "rel": "http://webfinger.net/rel/profile-page",
	        "type": "text/html",
	        "href": "https://lumenwrites.com"
	    }, {
	        "rel": "http://activitystrea.ms/spec/1.0",
	        "type": "application/atom+xml",
	        "href": "https://lumenwrites.com/@lumen.atom"
	    }, {
	        "rel": "http://schemas.google.com/g/2010#updates-from",
	        "type": "application/atom+xml",
	        "href": "https://lumenwrites.com/@lumen.atom"
	    }]
	};
	
	/**
	 * Get all posts
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getPosts(req, res) {
	    Post.find().sort('-dateAdded').exec(function (err, posts) {
	        if (err) {
	            res.status(500).send(err);
	        }
	        res.json(posts);
	    });
	}
	
	/**
	 * Save a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function createPost(req, res) {
	    console.log("Receiving post " + JSON.stringify(req.body));
	    var post = req.body;
	    if (!post.body) {
	        res.status(403).end();
	    }
	
	    // Sanitize inputs
	    post.body = sanitizeHtml(post.body);
	
	    var firstline = post.body.split('\n')[0];
	    post.slug = slug(firstline) + "-" + cuid.slug();
	
	    post = new Post(post);
	
	    post.save(function (err, post) {
	        if (err) {
	            res.status(500).send(err);
	        }
	        res.json(post);
	    });
	}
	
	var POST_STREAM = [{
	    "@context": ["https://www.w3.org/ns/activitystreams", { "@language": "en-GB" }],
	    "id": "https://rhiaro.co.uk/2016/05/minimal-activitypub",
	    "type": "Article",
	    "name": "Minimal ActivityPub update client",
	    "content": "Today I finished morph, a client for posting ActivityStreams2...",
	    "attributedTo": "https://rhiaro.co.uk/#amy",
	    "to": "https://rhiaro.co.uk/followers/",
	    "cc": "https://e14n.com/evan"
	}];
	
	function hostMeta(req, res) {
	    res.send(HOST_META);
	}
	
	function webFingerAccount(req, res) {
	    res.send(LUMEN);
	}
	
	function postStream(req, res) {
	    res.send(POST_STREAM);
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.getPosts = getPosts;
	exports.createPost = createPost;
	exports.getPost = getPost;
	exports.deletePost = deletePost;
	exports.test = test;
	
	var _post = __webpack_require__(3);
	
	var _post2 = _interopRequireDefault(_post);
	
	var _cuid = __webpack_require__(29);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _slug = __webpack_require__(34);
	
	var _slug2 = _interopRequireDefault(_slug);
	
	var _sanitizeHtml = __webpack_require__(33);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all posts
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getPosts(req, res) {
	   var filter = {};
	   if (req.query.tag) {
	      var tag = req.query.tag;
	      console.log("Posts filtered by tag: " + tag);
	      filter = { tags: { $all: tag } };
	   }
	
	   _post2.default.find(filter).sort('-dateAdded').exec(function (err, posts) {
	      if (err) {
	         res.status(500).send(err);
	      }
	      res.json(posts);
	   });
	}
	
	/**
	 * Save a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function createPost(req, res) {
	   console.log("Receiving post " + JSON.stringify(req.body));
	   var post = req.body;
	   if (!post.body) {
	      res.status(403).end();
	   }
	
	   // Sanitize inputs
	   post.body = (0, _sanitizeHtml2.default)(post.body);
	
	   var firstline = post.body.split('\n')[0];
	   post.slug = (0, _slug2.default)(firstline) + "-" + _cuid2.default.slug();
	   post.tags = post.tags.replace(/\s/g, '').split(",");
	
	   post = new _post2.default(post);
	
	   post.save(function (err, post) {
	      if (err) {
	         res.status(500).send(err);
	      }
	      res.json(post);
	   });
	}
	
	/**
	 * Get a single post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getPost(req, res) {
	   _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	      if (err) {
	         res.status(500).send(err);
	      }
	      res.json({ post: post });
	   });
	}
	
	/**
	 * Delete a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function deletePost(req, res) {
	   _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	      if (err) {
	         res.status(500).send(err);
	      }
	
	      post.remove(function () {
	         res.status(200).end();
	      });
	   });
	}
	
	function test(req, res) {
	   res.json({ hi: "hello" });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var config = __webpack_require__(2);
	
	exports.about = function (req, res, next) {
	    return res.send({
	        about: config.about
	    });
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var Subscriber = __webpack_require__(26);
	
	exports.subscribe = function (req, res, next) {
		var email = req.body.email;
		console.log("Subscriber's email " + email);
	
		// Search for a subscriber with a given email
		Subscriber.findOne({ email: email }, function (err, existingSubscriber) {
			if (err) {
				return next(err);
			}
	
			// If a subscriber does exit - return an error
			if (existingSubscriber) {
				return res.status(422).send({
					error: 'Already subscribed!'
				});
			}
	
			// If a subscriber doesn't exist - create and save subscriber record
			var subscriber = new Subscriber({
				email: email
			});
	
			subscriber.save(function (err) {
				//This is a callback that's being caleld once subscriber is saved
				if (err) {
					return next(err);
				}
				return res.send({
					error: 'Subscribed!'
				});
			});
		});
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	/* Mongoose is ORM, like models.py in django */
	var mongoose = __webpack_require__(1);
	var validator = __webpack_require__(8);
	var Schema = mongoose.Schema;
	var bcrypt = __webpack_require__(5);
	
	// Define model. 
	var userSchema = new Schema({
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
					}
	});
	
	// Create model class
	var ModelClass = mongoose.model('subscriber', userSchema);
	
	// Export model
	module.exports = ModelClass;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _express = __webpack_require__(0);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(16);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _mongoose = __webpack_require__(1);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _bodyParser = __webpack_require__(15);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _path = __webpack_require__(19);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _cors = __webpack_require__(17);
	
	var _cors2 = _interopRequireDefault(_cors);
	
	var _morgan = __webpack_require__(18);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _postRoutes = __webpack_require__(12);
	
	var _postRoutes2 = _interopRequireDefault(_postRoutes);
	
	var _settingsRoutes = __webpack_require__(13);
	
	var _settingsRoutes2 = _interopRequireDefault(_settingsRoutes);
	
	var _feedsRoutes = __webpack_require__(10);
	
	var _feedsRoutes2 = _interopRequireDefault(_feedsRoutes);
	
	var _subscriberRoutes = __webpack_require__(14);
	
	var _subscriberRoutes2 = _interopRequireDefault(_subscriberRoutes);
	
	var _authRoutes = __webpack_require__(9);
	
	var _authRoutes2 = _interopRequireDefault(_authRoutes);
	
	var _ostatusRoutes = __webpack_require__(11);
	
	var _ostatusRoutes2 = _interopRequireDefault(_ostatusRoutes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Initialize the Express Server
	var server = new _express2.default();
	
	// Connect to db.
	_mongoose2.default.Promise = global.Promise;
	var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/vertex';
	console.log("Connecting to the db at " + MONGO_DB_URL);
	_mongoose2.default.connect(MONGO_DB_URL, function (error) {
	    if (error) {
	        console.error('Please make sure Mongodb is installed and running!');
	        throw error;
	    }
	});
	
	// Serverly body Parser and server public assets and routes
	server.use((0, _compression2.default)());
	server.use(_bodyParser2.default.json({ limit: '20mb' }));
	server.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
	/* server.use(morgan('combined'));*/
	server.use((0, _cors2.default)());
	
	/* API Routes */
	server.use('/api/v1', _postRoutes2.default);
	server.use('/api/v1', _settingsRoutes2.default);
	server.use('/api/v1', _subscriberRoutes2.default);
	server.use('/api/v1/auth', _authRoutes2.default);
	
	/* OStatus Routes */
	server.use('/', _ostatusRoutes2.default);
	server.use('/', _feedsRoutes2.default);
	
	/* Serve static files */
	server.use('/styles', _express2.default.static(_path2.default.resolve(__dirname, '../client/styles')));
	server.use('/media', _express2.default.static(_path2.default.resolve(__dirname, '../client/media')));
	server.get('/bundle.js', function (req, res) {
	    res.sendFile(_path2.default.resolve(__dirname, '../client/dist/bundle.js'));
	});
	/* Send the rest of the requests to react. */
	server.use(function (req, res) {
	    return res.sendFile(_path2.default.resolve(__dirname, '../client/index.html'));
	});
	
	// start server
	var port = process.env.PORT || 3000;
	server.listen(port, function (error) {
	    if (!error) {
	        console.log('Server is running on port ' + port + '!');
	    } else {
	        console.error('Couldnt start server!');
	    }
	});
	
	exports.default = server;
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	// authentication layer, before the protected routes
	// check if user is logged in before accessing controllers(which are like django views)
	// So this is essentially @IsAuthenticated
	
	var passport = __webpack_require__(6);
	var JwtStrategy = __webpack_require__(7).Strategy;
	var LocalStrategy = __webpack_require__(32);
	var ExtractJwt = __webpack_require__(7).ExtractJwt;
	var User = __webpack_require__(4);
	var config = __webpack_require__(2);
	
	// by default you send a POST request with username and password
	// here Im telling it to use email instead
	var localOptions = { usernameField: 'email' };
	// Create local strategy.
	var localLogin = new LocalStrategy(localOptions, function (email, password, done) {
					console.log("Checking username and password. If they match - pass person in.");
	
					// Verify username/password
					// Call done with the user if it's correct
					// otherwise call done with false.
					User.findOne({ email: email }, function (err, user) {
									if (err) {
													return done(err);
									}
									/* if username not found */
									if (!user) {
													return done(null, false);
									}
									//compare passwords using the function I've defined in user model
									user.comparePassword(password, function (err, isMatch) {
													if (err) {
																	return done(err);
													}
													// if passwords don't match
													if (!isMatch) {
																	return done(null, flase);
													}
	
													// return user without errors
													return done(null, user);
									});
					});
	});
	
	// Set up options for jwt strategies
	//(ways to authenticate, like with token or username/password)
	// tell it where to look for token
	// and secret used to decode the token
	var jwtOptions = {
					jwtFromRequest: ExtractJwt.fromHeader('authorization'),
					secretOrKey: config.secret
	};
	
	// Create JWT Strategy for token authentication
	var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
					// payload is a decoded JWT token, sub and iat from the token.
					// done is a callback, depending on whether auth is successful
	
					// See if user id from payload exists in our database
					// If it does call 'done' with that user
					// otherwise, call 'done' without a user object
					User.findById(payload.sub, function (err, user) {
									if (err) {
													return done(err, false);
									}
	
									if (user) {
													done(null, user);
									} else {
													done(null, false);
									}
					});
	});
	
	// Tell passport to use JWT strategy
	passport.use(jwtLogin);
	passport.use(localLogin);

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("cuid");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("feed");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("jwt-simple");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("sanitize-html");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("slug");

/***/ }
/******/ ]);