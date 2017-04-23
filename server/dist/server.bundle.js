(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});
exports.updatePostBody = updatePostBody;
exports.updatePostTags = updatePostTags;
exports.setPublished = setPublished;
exports.fetchPosts = fetchPosts;
exports.fetchPost = fetchPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.fetchSettings = fetchSettings;
exports.createSubscriber = createSubscriber;
exports.subscribedClose = subscribedClose;

var _axios = __webpack_require__(24);

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = __webpack_require__(3);

var _apiCaller = __webpack_require__(21);

var _apiCaller2 = _interopRequireDefault(_apiCaller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Isomorphic api caller. Magically fetches data, both on client and server. */
console.log("API_URL " + _apiCaller.API_URL);

function updatePostBody(value) {
			return {
						type: 'UPDATE_POST_BODY',
						payload: value
			};
}

function updatePostTags(value) {
			return {
						type: 'UPDATE_POST_TAGS',
						payload: value
			};
}

function setPublished(published) {
			return {
						type: 'SET_PUBLISHED',
						payload: published
			};
}

function fetchPosts(filter) {
			var posts_url = 'posts/';
			var page_url = "";
			if (filter) {
						if (filter.currentPage) {
									page_url = "?page=" + filter.currentPage;
						}
						if (filter.tag) {
									/* Posts filtered by tag */
									posts_url = 'posts?tag=' + filter.tag;
						}
			}
			var url = posts_url + page_url;
			/* console.log("Fetching posts"); */
			return function (dispatch) {
						return (0, _apiCaller2.default)(posts_url).then(function (res) {
									dispatch({
												type: 'FETCH_POSTS',
												payload: res
									});
						});
			};
}

function fetchPost(slug) {
			/* console.log(">>>> src/actions/index.js:");
    * console.log("Fetching post.");	    */
			return function (dispatch) {
						return (0, _apiCaller2.default)('posts/' + slug).then(function (res) {
									/* console.log("apiCaller response: " + JSON.stringify(res));*/
									dispatch({
												type: 'FETCH_POST',
												payload: res
									});
						});
			};
}

function createPost(post) {
			// Get the saved token from local storage
			var config = {
						headers: { authorization: 'Token ' + localStorage.getItem('token') }
			};

			return function (dispatch) {
						_axios2.default.post(_apiCaller.API_URL + '/posts', post, config).then(function (response) {
									_reactRouter.browserHistory.push('/');
									/* console.log(response);*/
									dispatch({
												type: 'CREATE_POST',
												payload: response.data
									});
						});
			};
}

function updatePost(slug, post) {
			/* console.log(">>>> src/actions/index.js:");
    * console.log("Getting a token from localStorage. ");	    */

			/* Get the saved token from local storage */
			var config = {
						headers: { authorization: 'Token ' + localStorage.getItem('token') }
			};

			/* console.log("Post Tags: " + post.tags);*/

			return function (dispatch) {
						_axios2.default.post(_apiCaller.API_URL + '/posts/' + slug, post, config).then(function (response) {
									console.log(">>>> src/actions/index.js:");
									console.log("Updated a post. Redirecting to it. " + response.data.body);
									_reactRouter.browserHistory.push('/post/' + response.data.slug);
									/* console.log(response);*/
									dispatch({
												type: 'UPDATE_POST',
												payload: response
									});
						});
			};
}

function deletePost(slug) {
			/* console.log(">>>> src/actions/index.js:");
    * console.log("Deleting post.");	    */
			var config = {
						headers: { authorization: 'Token ' + localStorage.getItem('token') }
			};

			return function (dispatch) {
						_axios2.default.delete(_apiCaller.API_URL + '/posts/' + slug, config).then(function (response) {
									console.log(">>>> src/actions/index.js (promise):");
									console.log("Successfully deleted post. Dispatching action DELETE_POST.");
									_reactRouter.browserHistory.push('/');

									dispatch({
												type: 'DELETE_POST',
												payload: slug
									});
						});
			};
}

/* 
export function fetchSettings() {
    return function(dispatch) {    
	axios.get(`${API_URL}/settings/`)
	     .then(response => {
		 console.log("axios response: " + JSON.stringify(response));
		 dispatch({
		     type: 'FETCH_SETTINGS',
		     payload: response
		 });
	     });
    };
}
*/

function fetchSettings() {
			return function (dispatch) {
						return (0, _apiCaller2.default)('settings').then(function (res) {
									/* console.log("apiCaller response: " + JSON.stringify(res));*/
									dispatch({
												type: 'FETCH_SETTINGS',
												payload: res
									});
						});
			};
}

function createSubscriber(props) {
			return function (dispatch) {
						_axios2.default.post(_apiCaller.API_URL + '/subscribe', props).then(function (response) {
									/* browserHistory.push('/');*/
									console.log(response);
									dispatch({
												type: 'CREATE_SUBSCRIBER',
												payload: response
									});
						});
			};
}

function subscribedClose() {
			return {
						type: 'SUBSCRIBED_CLOSE',
						payload: false
			};
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(3);

var _reactBootstrap = __webpack_require__(5);

var _remarkable = __webpack_require__(82);

var _remarkable2 = _interopRequireDefault(_remarkable);

var _reactFontawesome = __webpack_require__(12);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _index = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_Component) {
	_inherits(Post, _Component);

	function Post() {
		_classCallCheck(this, Post);

		return _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).apply(this, arguments));
	}

	_createClass(Post, [{
		key: 'renderPostHeader',
		value: function renderPostHeader() {
			/* Return post header */
			if (this.props.link) {
				/* PostList will use this component, and pass a link to it
       so you can click on the title and view it */

				return _react2.default.createElement(
					'h1',
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: this.props.link },
						this.props.title
					)
				);
			} else {
				/* Post detail does not pass a link. */
				return _react2.default.createElement(
					'h1',
					null,
					this.props.title
				);
			}
		}
	}, {
		key: 'renderDraftLabel',
		value: function renderDraftLabel() {
			if (!this.props.published) {
				/* Show "Draft" label on non-published posts */
				return _react2.default.createElement(
					_reactBootstrap.Label,
					{ bsStyle: 'default', className: 'label-draft' },
					'Draft'
				);
			} else {
				return null;
			}
		}
	}, {
		key: 'renderBody',
		value: function renderBody() {
			var body = this.props.body;
			/* Truncate the post to the number of words passed as a truncate prop. */
			var truncated = body.split(" ").splice(0, this.props.truncate).join(" ");
			if (this.props.truncate && body > truncated) {
				body = truncated;
			}

			/* Turn markdown into html */
			var md = new _remarkable2.default({ html: true });
			var markdown = md.render(body);
			return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: markdown } });
		}
	}, {
		key: 'renderReadMore',
		value: function renderReadMore() {
			/* Add "read more..." link at the end of truncated posts. */
			var body = this.props.body;
			var truncated = body.split(" ").splice(0, this.props.truncate).join(" ");
			if (this.props.truncate && body > truncated) {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: this.props.link,
							className: 'readMore' },
						' Read more...'
					)
				);
			} else {
				return _react2.default.createElement('div', null);
			}
		}
	}, {
		key: 'renderFooter',
		value: function renderFooter() {
			var _this2 = this;

			var _props = this.props,
			    tags = _props.tags,
			    category = _props.category;


			var tagItems = "";
			var categoryItem = "";

			/* If there are some tags - generate tag labels  */
			if (tags && tags.length > 0) {
				tagItems = tags.map(function (tag) {
					return _react2.default.createElement(
						'span',
						{ key: tag },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/tag/' + tag },
							_react2.default.createElement(
								_reactBootstrap.Label,
								{ bsStyle: 'default' },
								tag
							),
							'\xA0'
						)
					);
				});
			}

			/* If there's a category - generate a category label */
			if (category) {
				categoryItem = _react2.default.createElement(
					'span',
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/category/' + category.slug },
						_react2.default.createElement(
							_reactBootstrap.Label,
							{ bsStyle: 'default', className: 'label-category' },
							category.title
						)
					),
					'\xA0'
				);
			}

			return _react2.default.createElement(
				'div',
				{ className: 'post-footer' },
				categoryItem,
				tagItems,
				_react2.default.createElement(
					'div',
					{ className: 'right' },
					_react2.default.createElement(
						_reactRouter.Link,
						{ className: 'black', to: 'http://rayalez.com' },
						'@lumenwrites'
					),
					!this.props.published ? _react2.default.createElement(
						_reactBootstrap.Label,
						{ bsStyle: 'default', className: 'label-draft' },
						'Draft'
					) : null,
					this.props.authenticated ? _react2.default.createElement(
						_reactRouter.Link,
						{ to: "/post/" + this.props.slug + "/edit", className: 'icon' },
						_react2.default.createElement('i', { className: 'fa fa-pencil' })
					) : null,
					this.props.authenticated ? _react2.default.createElement(
						'a',
						{ onClick: function onClick() {
								return _this2.props.deletePost(_this2.props.slug);
							},
							className: 'icon' },
						_react2.default.createElement('i', { className: 'fa fa-trash' })
					) : null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: "/post/" + this.props.slug, className: 'icon' },
						_react2.default.createElement('i', { className: 'fa fa-link' })
					)
				),
				_react2.default.createElement('div', { className: 'clearfix' })
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'article',
					{ className: 'post panel panel-default' },
					_react2.default.createElement(
						'div',
						null,
						this.renderBody(),
						this.renderReadMore()
					),
					_react2.default.createElement('br', null),
					this.renderFooter()
				)
			);
		}
	}]);

	return Post;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(null, { deletePost: _index.deletePost })(Post);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    secret: 'asdfsdfsf'
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var postSchema = new Schema({
    slug: { type: 'String', required: true },
    body: { type: 'String', required: true },
    tags: [String],
    published: { type: 'Boolean', default: true },
    dateAdded: { type: 'Date', default: Date.now, required: true }
});

exports.default = _mongoose2.default.model('Post', postSchema);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-fontawesome");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-meta-tags");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-router-bootstrap");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("redux-form");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactBootstrap = __webpack_require__(5);

var _Header = __webpack_require__(52);

var _Header2 = _interopRequireDefault(_Header);

var _Footer = __webpack_require__(51);

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Vendor Components
/* import Helmet from 'react-helmet';*/


// Styles
/* 
import '../styles/bootstrap.min.css';
import '../styles/font-awesome.min.css';
import '../styles/foundation-icons.css';
import '../styles/simplemde.min.css';
import '../styles/style.scss';
*/

/* My Components */


var Main = function (_Component) {
	_inherits(Main, _Component);

	function Main() {
		_classCallCheck(this, Main);

		return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
	}

	_createClass(Main, [{
		key: 'render',
		value: function render() {
			/* For child routers */
			var children = this.props.children;

			return _react2.default.createElement(
				'div',
				{ className: 'mainWrapper' },
				_react2.default.createElement(_Header2.default, null),
				_react2.default.createElement(
					'div',
					{ className: 'page' },
					_react2.default.createElement(
						_reactBootstrap.Grid,
						null,
						_react2.default.createElement(
							_reactBootstrap.Row,
							{ className: 'show-grid' },
							_react2.default.createElement(
								_reactBootstrap.Col,
								{ xs: 12, md: 12 },
								children
							)
						)
					)
				),
				_react2.default.createElement(_Footer2.default, null)
			);
		}
	}]);

	return Main;
}(_react.Component);

exports.default = Main;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(7);

var _reduxForm = __webpack_require__(15);

var _posts = __webpack_require__(64);

var _posts2 = _interopRequireDefault(_posts);

var _post = __webpack_require__(62);

var _post2 = _interopRequireDefault(_post);

var _postForm = __webpack_require__(63);

var _postForm2 = _interopRequireDefault(_postForm);

var _categories = __webpack_require__(61);

var _categories2 = _interopRequireDefault(_categories);

var _settings = __webpack_require__(66);

var _settings2 = _interopRequireDefault(_settings);

var _profiles = __webpack_require__(65);

var _profiles2 = _interopRequireDefault(_profiles);

var _auth = __webpack_require__(60);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    form: _reduxForm.reducer,
    posts: _posts2.default,
    post: _post2.default,
    postForm: _postForm2.default,
    categories: _categories2.default,
    settings: _settings2.default,
    profiles: _profiles2.default,
    auth: _auth2.default
});

exports.default = rootReducer;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.signinUser = signinUser;
exports.signupUser = signupUser;
exports.signoutUser = signoutUser;
exports.authError = authError;
exports.fetchMessage = fetchMessage;

var _axios = __webpack_require__(24);

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = __webpack_require__(3);

var _types = __webpack_require__(49);

var _apiCaller = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signinUser(_ref) {
	var username = _ref.username,
	    password = _ref.password;

	return function (dispatch) {
		// send username/password
		// .then - success, .catch - fail.
		console.log(">>>> src/actions/auth.js:");
		console.log("Sending POST request from signinUser.");
		/* console.log("Username: " + username);
     console.log("Password: " + password);	*/
		var credentials = {
			"email": username,
			"password": password
		};
		_axios2.default.post(_apiCaller.API_URL + '/auth/login', credentials).then(function (response) {
			console.log("Successfully signed in!");
			// if request is good
			// - update state to indicate that I'm signed in
			dispatch({ type: 'AUTH_USER' });
			console.log("Auth action dispatched(to flip auth state to true)");
			// - save JWT token
			localStorage.setItem('token', response.data.token);
			console.log("Token saved!");
			// - redirect to /feature
			_reactRouter.browserHistory.push('/');
			console.log("Redirected to /");
		}).catch(function () {
			// if request is bad
			dispatch(authError('Bad Login Info'));
		});
	};
}

function signupUser(_ref2) {
	var username = _ref2.username,
	    password = _ref2.password;

	return function (dispatch) {
		// send username/password
		// .then - success, .catch - fail.
		_axios2.default.post(_apiCaller.API_URL + '/signup', { username: username, password: password }).then(function (response) {
			// if request is good
			// - update state to indicate that I'm signed up
			dispatch({ type: _types.AUTH_USER });
			// - save JWT token
			localStorage.setItem('token', response.data.token);
			// - redirect to /feature
			_reactRouter.browserHistory.push('/');
		}).catch(function () {
			// if request is bad - add error to the state.
			dispatch(authError('User with this username already exists'));
		});
	};
}

function signoutUser() {
	// delete token and signout
	console.log(">>>> src/actions/auth.js:");
	console.log("Signing out user, deleting token from localStorage.");
	localStorage.removeItem('token');
	console.log("Redirecting to /, and dispatching action UNAUTH_USER.");
	_reactRouter.browserHistory.push('/');
	return {
		type: 'UNAUTH_USER'
	};
}

function authError(error) {
	return {
		type: _types.AUTH_ERROR,
		payload: error
	};
}

function fetchMessage() {
	var config = {
		headers: { authorization: localStorage.getItem('token') }
	};

	return function (dispatch) {
		_axios2.default.get(_apiCaller.API_URL, config).then(function (response) {
			/* console.log(response);*/
			dispatch({
				type: _types.FETCH_MESSAGE,
				payload: response.data.message
			});
		});
	};
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(28);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(7);

var _reactRedux = __webpack_require__(1);

var _index = __webpack_require__(2);

var actionCreators = _interopRequireWildcard(_index);

var _reactBootstrap = __webpack_require__(5);

var _reactRouterBootstrap = __webpack_require__(14);

var _reactSimplemdeEditor = __webpack_require__(29);

var _reactSimplemdeEditor2 = _interopRequireDefault(_reactSimplemdeEditor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_Component) {
	_inherits(Editor, _Component);

	function Editor() {
		_classCallCheck(this, Editor);

		return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
	}

	_createClass(Editor, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			/* Disable tab key in the editor */
			this.editor.simplemde.codemirror.options.extraKeys['Tab'] = false;
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			/* Clean the form */
			this.props.updatePostBody("");
			this.props.updatePostTags("");
			/* console.log("Props " + JSON.stringify(this.props));*/

			if (this.props.autopublish) {
				/* If I'm writing a new post from the timeline, it's published by default.*/
				this.props.setPublished(true);
			}

			if (this.props.params.slug) {
				/* If there's slug - that means I'm editing a post,
       so fetch the post and put it into the redux postForm. */
				this.props.fetchPost(this.props.params.slug);
			}
		}
	}, {
		key: 'onPublishClick',
		value: function onPublishClick() {
			var post = this.props.postForm;
			/* When I click Publish/Un-Publish button
      - flip the "published" parameter, and save the post.*/
			post.published = !this.props.postForm.published;
			this.props.updatePost(this.props.params.slug, post);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			/* Grabbing the post from the redux state */
			var postForm = this.props.postForm;
			/* Calculate post length for character counter */

			var postLength = postForm.body.length + postForm.tags.length;

			/* Customize toolbar for simplemde */
			var defaultToolbar = ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "preview", "side-by-side", "fullscreen", "guide"];
			return _react2.default.createElement(
				'div',
				{ className: 'post-editor' },
				_react2.default.createElement(_reactSimplemdeEditor2.default, {
					onChange: this.props.updatePostBody,
					value: this.props.postForm.body,
					ref: function ref(input) {
						_this2.editor = input;
					},
					options: {
						spellChecker: false,
						/* If I'm on "/post/post-slug/edit", or on "/write"
         then I want to see the toolbar.
         Otherwise I'm on the timeline and I want to hide it.*/
						toolbar: this.props.params.slug || this.props.route ? defaultToolbar : false,
						status: false,
						placeholder: "Write here... (can use markdown)",
						initialValue: this.props.postForm.body,
						indentWithTabs: false,
						tabSize: 4
					} }),
				_react2.default.createElement(_reactBootstrap.FormControl, { className: "post-tags",
					type: 'text',
					placeholder: 'tag1, tag2, tag3',
					value: this.props.postForm.tags,
					onChange: function onChange(event) {
						return _this2.props.updatePostTags(event.target.value);
					} }),
				_react2.default.createElement(
					'div',
					{ className: "character-count form-control " + (postLength > 100 ? "red" : "") },
					postLength
				),
				this.props.params.slug ? _react2.default.createElement(
					_reactBootstrap.Button,
					{ bsStyle: 'primary',
						onClick: function onClick() {
							return _this2.props.updatePost(_this2.props.params.slug, _this2.props.postForm);
						} },
					'Save'
				) : _react2.default.createElement(
					_reactBootstrap.Button,
					{ className: 'post-button', bsStyle: 'primary',
						onClick: function onClick() {
							return _this2.props.createPost(_this2.props.postForm);
						} },
					this.props.autopublish ? "Post" : "Save"
				),
				_react2.default.createElement('div', { className: 'clearfix' }),
				this.props.params.slug ? _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement('br', null),
					_react2.default.createElement(
						_reactBootstrap.Button,
						{ onClick: function onClick() {
								return _this2.props.deletePost(_this2.props.params.slug);
							} },
						'Delete Post'
					),
					_react2.default.createElement(
						_reactBootstrap.Button,
						{ className: 'right', onClick: this.onPublishClick.bind(this) },
						!this.props.postForm.published ? "Publish" : "Un-Publish"
					),
					_react2.default.createElement('div', { className: 'clearfix' }),
					_react2.default.createElement('br', null)
				) : null
			);
		}
	}]);

	return Editor;
}(_react.Component);

function mapStateToProps(state) {
	return {
		post: state.posts,
		postForm: state.postForm
	};
}

function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)(actionCreators, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Editor);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactDom = __webpack_require__(28);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(3);

var _reactFontawesome = __webpack_require__(12);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _reactBootstrap = __webpack_require__(5);

var _index = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubscribeForm = function (_Component) {
	_inherits(SubscribeForm, _Component);

	function SubscribeForm(props) {
		_classCallCheck(this, SubscribeForm);

		var _this = _possibleConstructorReturn(this, (SubscribeForm.__proto__ || Object.getPrototypeOf(SubscribeForm)).call(this, props));

		_this.onSubmit = _this.onSubmit.bind(_this);
		return _this;
	}

	_createClass(SubscribeForm, [{
		key: 'onSubmit',
		value: function onSubmit(event) {
			event.preventDefault();
			console.log('Email: ' + _reactDom2.default.findDOMNode(this.refs.email).value);
			var email = { email: _reactDom2.default.findDOMNode(this.refs.email).value };
			this.props.createSubscriber(email);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'form',
				{ className: 'subscription-form', onSubmit: this.onSubmit },
				_react2.default.createElement(_reactBootstrap.FormControl, { className: 'email',
					type: 'email',
					placeholder: 'email',
					ref: 'email' }),
				_react2.default.createElement(
					_reactBootstrap.Button,
					{ bsStyle: 'primary', className: 'subscribe',
						type: 'submit' },
					'Subscribe'
				),
				_react2.default.createElement(
					'a',
					{ href: '/feed/posts.atom', className: 'btn rss' },
					_react2.default.createElement(_reactFontawesome2.default, { name: 'rss' })
				),
				_react2.default.createElement('div', { className: 'clearfix' })
			);
		}
	}]);

	return SubscribeForm;
}(_react.Component);

function mapStateToProps(state) {
	return { settings: state.settings.all };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { createSubscriber: _index.createSubscriber })(SubscribeForm);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.default = callApi;

var _isomorphicFetch = __webpack_require__(78);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _config = __webpack_require__(9);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API_URL = 'https://lumenwrites.com/api/v1';

if (process.env.NODE_ENV === 'development') {
				API_URL = 'http://localhost:3000/api/v1';
}
console.log("API_URL " + API_URL);

function callApi(endpoint) {
				var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
				var body = arguments[2];

				/* console.log("Calling api " + API_URL+"/"+endpoint);*/
				return (0, _isomorphicFetch2.default)(API_URL + '/' + endpoint, {
								headers: { 'content-type': 'application/json' },
								method: method,
								body: JSON.stringify(body)
				}).then(function (response) {
								return response.json().then(function (json) {
												return { json: json, response: response };
								});
				}).then(function (_ref) {
								var json = _ref.json,
								    response = _ref.response;

								if (!response.ok) {
												return Promise.reject(json);
								}

								return json;
				}).then(function (response) {
								return response;
				}, function (error) {
								return error;
				});
}

module.exports = {
				API_URL: API_URL
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Mongoose is ORM, like models.py in django */
var mongoose = __webpack_require__(6);
var validator = __webpack_require__(33);
var Schema = mongoose.Schema;
var bcrypt = __webpack_require__(25);

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
			}
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

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// authentication layer, before the protected routes
// check if user is logged in before accessing controllers(which are like django views)
// So this is essentially @IsAuthenticated

var passport = __webpack_require__(11);
var JwtStrategy = __webpack_require__(27).Strategy;
var LocalStrategy = __webpack_require__(80);
var ExtractJwt = __webpack_require__(27).ExtractJwt;
var User = __webpack_require__(22);
var config = __webpack_require__(9);

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

				console.log("JWT login");
				// See if user id from payload exists in our database
				// If it does call 'done' with that user
				// otherwise, call 'done' without a user object
				User.findById(payload.sub, function (err, user) {
								if (err) {
												return done(err, false);
								}
								console.log("JWT login ");
								if (user) {
												done(null, user);
								} else {
												done(null, false);
								}
				});
});

/* console.log("jwtLogin " + JSON.stringify(jwtLogin));*/

// Tell passport to use JWT strategy
passport.use(jwtLogin);
passport.use(localLogin);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("cuid");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("react-simplemde-editor");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("remove-markdown");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("sanitize-html");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("slug");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(3);

var _Main = __webpack_require__(16);

var _Main2 = _interopRequireDefault(_Main);

var _PostList = __webpack_require__(55);

var _PostList2 = _interopRequireDefault(_PostList);

var _PostNew = __webpack_require__(56);

var _PostNew2 = _interopRequireDefault(_PostNew);

var _Editor = __webpack_require__(19);

var _Editor2 = _interopRequireDefault(_Editor);

var _PostDetail = __webpack_require__(54);

var _PostDetail2 = _interopRequireDefault(_PostDetail);

var _About = __webpack_require__(50);

var _About2 = _interopRequireDefault(_About);

var _signin = __webpack_require__(58);

var _signin2 = _interopRequireDefault(_signin);

var _signout = __webpack_require__(59);

var _signout2 = _interopRequireDefault(_signout);

var _require_auth = __webpack_require__(57);

var _require_auth2 = _interopRequireDefault(_require_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require.ensure polyfill for node
if (false) {
    require.ensure = function requireModule(deps, callback) {
        callback(require);
    };
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
exports.default = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _Main2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _PostList2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'write', component: (0, _require_auth2.default)(_Editor2.default) }),
    _react2.default.createElement(_reactRouter.Route, { path: 'post/:slug', component: _PostDetail2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'category/:category', component: _PostList2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'tag/:tag', component: _PostList2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'post/:slug/edit', component: (0, _require_auth2.default)(_Editor2.default) }),
    _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _About2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _signin2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'logout', component: _signout2.default })
);

/* 
<IndexRoute
getComponent={(n
extState, cb) => {
    require.ensure([], require => {
        cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
    });
}}
/>
<Route
path="/posts/:slug-:cuid"
getComponent={(nextState, cb) => {
    require.ensure([], require => {
        cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
    });
}}
/>
*/

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureStore = configureStore;

var _redux = __webpack_require__(7);

var _reduxThunk = __webpack_require__(81);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _rootReducer = __webpack_require__(17);

var _rootReducer2 = _interopRequireDefault(_rootReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Middleware and store enhancers
  var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];

  var store = (0, _redux.createStore)(_rootReducer2.default, initialState, _redux.compose.apply(undefined, enhancers));

  return store;
} /**
   * Main store function. Sets up store both on client, and on server-side rendering.
   */

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(4);

var _activitypub = __webpack_require__(67);

var ActivityPubControllers = _interopRequireWildcard(_activitypub);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all ActivityPub
router.route('/lumen/').get(ActivityPubControllers.person);
router.route('/lumen/inbox').post(ActivityPubControllers.inbox);
router.route('/lumen/outbox').get(ActivityPubControllers.outbox);

exports.default = router;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(4);

var _feeds = __webpack_require__(68);

var feedsControllers = _interopRequireWildcard(_feeds);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Posts
router.route('/feed/posts.atom').get(feedsControllers.getFeed);

exports.default = router;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(4);

var _ostatus = __webpack_require__(69);

var OStatusControllers = _interopRequireWildcard(_ostatus);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all OStatus
router.route('/.well-known/host-meta').get(OStatusControllers.hostMeta);
router.route('/.well-known/webfinger*').get(OStatusControllers.webFingerAccount);

router.route('/@lumen.feed').get(OStatusControllers.postStream);
/* router.route('/feeds/posts.atom').ostatus(OStatusControllers.createOStatus);*/

exports.default = router;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(4);

var _posts = __webpack_require__(70);

var postsControllers = _interopRequireWildcard(_posts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

var passport = __webpack_require__(11);
var passportService = __webpack_require__(23);
var requireAuth = passport.authenticate('jwt', { session: false });

// Get all Posts
router.route('/posts').get(postsControllers.getPosts);

// Get one post by slug
router.route('/posts/:slug').get(postsControllers.getPost);

// Add a new Post
router.route('/posts').post(postsControllers.createPost);

// Update post
router.route('/posts/:slug').post(postsControllers.updatePost);
// Delete post
router.route('/posts/:slug').delete(postsControllers.deletePost);

router.route('/test').get(postsControllers.test);
router.route('/categories').get(function (req, res) {
  return res.send({ hi: "Hello!" });
});

exports.default = router;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(4);

var router = new _express.Router();

var passport = __webpack_require__(11);
var passportService = __webpack_require__(23);

var requireAuth = passport.authenticate('jwt', { session: false });
var requireSignin = passport.authenticate('local', { session: false });

var profilesControllers = __webpack_require__(71);

// Make every request go through the passport profilesentication check:
router.route('/auth-test').get(requireAuth, function (req, res) {
    res.send({ message: 'Successfully accessed protected API!' });
});

/* Take a request from a url and send a response. */
router.route('/auth/join').post(profilesControllers.signup);
router.route('/auth/login').post(requireSignin, profilesControllers.signin);

/* Subscribe */
router.route('/subscribe').post(profilesControllers.subscribe);

exports.default = router;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(4);

var _settings = __webpack_require__(72);

var SettingsController = _interopRequireWildcard(_settings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Settingss
router.route('/settings').get(SettingsController.about);

exports.default = router;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchComponentData = fetchComponentData;

var _promiseUtils = __webpack_require__(76);

function fetchComponentData(store, components, params) {
  var needs = components.reduce(function (prev, current) {
    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
  }, []);

  return (0, _promiseUtils.sequence)(needs, function (need) {
    return store.dispatch(need(params, store.getState()));
  });
} /*
  Utility function to fetch required data for component to render in server side.
  This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
  */

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var AUTH_USER = exports.AUTH_USER = 'auth_user';
var UNAUTH_USER = exports.UNAUTH_USER = 'unauth_user';
var AUTH_ERROR = exports.AUTH_ERROR = 'auth_error';
var FETCH_MESSAGE = exports.FETCH_MESSAGE = 'fetch_message';

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _index = __webpack_require__(2);

var _reactMetaTags = __webpack_require__(13);

var _reactMetaTags2 = _interopRequireDefault(_reactMetaTags);

var _removeMarkdown = __webpack_require__(30);

var _removeMarkdown2 = _interopRequireDefault(_removeMarkdown);

var _Post = __webpack_require__(8);

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = function (_Component) {
			_inherits(About, _Component);

			function About() {
						_classCallCheck(this, About);

						return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
			}

			_createClass(About, [{
						key: 'componentWillMount',
						value: function componentWillMount() {
									this.props.fetchSettings();
						}
			}, {
						key: 'renderMetaInfo',
						value: function renderMetaInfo() {
									var settings = this.props.settings;
									var post = this.props.post;

									if (!settings) {
												return null;
									}
									/* Remove markdown from post body, and truncate it to 160 chars. */

									var body = "";
									if (settings.about) {
												body = (0, _removeMarkdown2.default)(settings.about);
									}
									var truncate_length = 160;
									var description = body.substring(0, truncate_length - 3) + "...";

									if (!settings.title) {
												return null;
									}
									return _react2.default.createElement(
												_reactMetaTags2.default,
												null,
												_react2.default.createElement(
															'title',
															null,
															"About " + settings.title
												),
												_react2.default.createElement('meta', { name: 'author', content: settings.author }),
												_react2.default.createElement('meta', { name: 'description',
															content: description }),
												_react2.default.createElement('meta', { name: 'keywords',
															content: settings.keywords })
									);
						}
			}, {
						key: 'render',
						value: function render() {
									var about = this.props.settings.about;

									if (!about) {
												return _react2.default.createElement('div', null);
									}
									if (about == "") {
												about = "To edit this text, go to /admin, create settings object, and fill in the info.";
									}

									return _react2.default.createElement(
												'div',
												null,
												this.renderMetaInfo(),
												_react2.default.createElement(_Post2.default, { title: 'About', published: true, body: about })
									);
						}
			}]);

			return About;
}(_react.Component);

// Actions required to provide data for this component to render in sever side.


About.need = [function () {
			return (0, _index.fetchSettings)();
}];

function mapStateToProps(state) {
			return { settings: state.settings };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchSettings: _index.fetchSettings })(About);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = __webpack_require__(12);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
	_inherits(Footer, _Component);

	function Footer() {
		_classCallCheck(this, Footer);

		return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
	}

	_createClass(Footer, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'footer',
				{ className: 'footer' },
				_react2.default.createElement(
					'div',
					{ className: 'right credit' },
					'Made by ',
					_react2.default.createElement(
						'a',
						{ href: 'http://rayalez.com' },
						'Ray Alez'
					),
					_react2.default.createElement(
						'a',
						{ href: 'https://github.com/raymestalez/django-react-blog' },
						_react2.default.createElement(_reactFontawesome2.default, { name: 'github' })
					)
				)
			);
		}
	}]);

	return Footer;
}(_react.Component);

exports.default = Footer;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(3);

var _index = __webpack_require__(2);

var _reactBootstrap = __webpack_require__(5);

var _SubscribeForm = __webpack_require__(20);

var _SubscribeForm2 = _interopRequireDefault(_SubscribeForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* import LogoImage from '../../img/screaming-sun.png'*/


/* import FontAwesome from 'react-fontawesome';*/

var Header = function (_Component) {
	_inherits(Header, _Component);

	function Header(props) {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

		_this.state = { showModal: false };

		_this.openModal = _this.openModal.bind(_this);
		_this.closeModal = _this.closeModal.bind(_this);
		return _this;
	}

	_createClass(Header, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			/* call action creator */
			/* action creator will grab the post with this id from the API   */
			/* and send it to the reducer */
			/* reducer will add it to the state */
			this.props.fetchSettings();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.props.subscribed) {
				/* If the modal is open - close it before showing
       subscription confirmation*/
				if (this.state.showModal) {
					this.setState({ showModal: false });
				}
				/* After the user submits email, I set subscribed state to true.
       If it is true - wait for 2 seconds(displaying success alert),
       then send out the action flipping subscribed back to false. */
				var close = this.props.subscribedClose;
				setTimeout(function () {
					close();
				}, 2000);
			}
		}
	}, {
		key: 'renderSubscribedConfirmation',
		value: function renderSubscribedConfirmation() {
			/* Display success alert while subscribed state is set to true. */
			if (this.props.subscribed) {
				return _react2.default.createElement(
					'div',
					{ className: 'alert alert-success' },
					_react2.default.createElement(
						'strong',
						null,
						'Success!'
					),
					' Thank you for subscribing!'
				);
			}
		}
	}, {
		key: 'openModal',
		value: function openModal() {
			this.setState({ showModal: true });
		}
	}, {
		key: 'closeModal',
		value: function closeModal() {
			this.setState({ showModal: false });
		}
	}, {
		key: 'renderCategories',
		value: function renderCategories() {
			var categories = this.props.settings.categories;
			/* console.log("Rendering categories: " + categories);*/

			if (!categories || categories.length == 0) {
				return null;
			};

			var categories_list = categories.map(function (category) {
				/* Capitalize */
				var capitalized = category.charAt(0).toUpperCase() + category.slice(1);
				/* console.log("Looping over categories. Category: " + category);*/
				return _react2.default.createElement(
					'li',
					{ key: category },
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/tag/' + category },
						capitalized
					)
				);
			});

			return _react2.default.createElement(
				'span',
				{ className: 'dropdown' },
				_react2.default.createElement(
					_reactRouter.Link,
					{ to: '/' },
					'Browse'
				),
				_react2.default.createElement(
					'ul',
					{ className: 'dropdown-menu' },
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/' },
							'All'
						)
					),
					categories_list
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var title = this.props.settings.title;
			return _react2.default.createElement(
				'header',
				null,
				_react2.default.createElement(
					_reactBootstrap.Modal,
					{ show: this.state.showModal,
						onHide: this.closeModal },
					_react2.default.createElement(
						'div',
						{ className: 'panel subscription-box' },
						_react2.default.createElement(_SubscribeForm2.default, null)
					)
				),
				this.renderSubscribedConfirmation(),
				_react2.default.createElement(
					'div',
					{ className: 'container' },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(
							'div',
							{ className: 'col-xs-12 col-sm-6 search' },
							_react2.default.createElement(
								_reactRouter.Link,
								{ className: 'logo', to: '/' },
								_react2.default.createElement('img', { src: '/media/images/logo.png' }),
								_react2.default.createElement('span', { className: 'title',
									dangerouslySetInnerHTML: { __html: title } })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'col-xs-12 col-sm-6 main-menu' },
							_react2.default.createElement(
								'div',
								{ className: 'menu' },
								this.renderCategories(),
								_react2.default.createElement(
									'a',
									{ onClick: this.openModal },
									'Subscribe'
								),
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/about/' },
									'About'
								),
								this.props.authenticated ? _react2.default.createElement(
									_reactRouter.Link,
									{ key: 2, to: { pathname: '/logout' } },
									_react2.default.createElement('i', { className: 'fa fa-sign-out' })
								) : null
							)
						)
					)
				),
				_react2.default.createElement(
					_reactBootstrap.Modal,
					null,
					'Modal'
				)
			);
		}
	}]);

	return Header;
}(_react.Component);

// Actions required to provide data for this component to render in sever side.


Header.need = [function () {
	return (0, _index.fetchSettings)();
}];

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		settings: state.settings,
		subscribed: state.profiles.subscribed
	};
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchSettings: _index.fetchSettings, subscribedClose: _index.subscribedClose })(Header);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _index = __webpack_require__(2);

var _reactRouter = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
	_inherits(Pagination, _Component);

	function Pagination() {
		_classCallCheck(this, Pagination);

		return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
	}

	_createClass(Pagination, [{
		key: 'render',
		value: function render() {
			var currentPage = parseInt(this.props.location.query.page ? this.props.location.query.page : 1);
			var prevPage = currentPage - 1;
			var nextPage = currentPage + 1;

			return _react2.default.createElement(
				'div',
				{ className: 'pagination panel' },
				_react2.default.createElement(
					'span',
					{ className: 'step-links' },
					currentPage > 1 ? _react2.default.createElement(
						_reactRouter.Link,
						{ to: "",
							query: Object.assign({}, this.props.location.query, { page: prevPage }) },
						_react2.default.createElement('i', { className: 'fa fa-chevron-left left' })
					) : null,
					_react2.default.createElement(
						'span',
						{ className: 'current' },
						'Page ',
						currentPage
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: "",
							query: Object.assign({}, this.props.location.query, { page: nextPage }) },
						_react2.default.createElement('i', { className: 'fa fa-chevron-right right' })
					)
				)
			);
		}
	}]);

	return Pagination;
}(_react.Component);

function mapStateToProps(state) {
	return { settings: state.settings.all };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchSettings: _index.fetchSettings })(Pagination);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _index = __webpack_require__(2);

var _reactMetaTags = __webpack_require__(13);

var _reactMetaTags2 = _interopRequireDefault(_reactMetaTags);

var _removeMarkdown = __webpack_require__(30);

var _removeMarkdown2 = _interopRequireDefault(_removeMarkdown);

var _reactBootstrap = __webpack_require__(5);

var _reactRouterBootstrap = __webpack_require__(14);

var _Post = __webpack_require__(8);

var _Post2 = _interopRequireDefault(_Post);

var _SubscribeForm = __webpack_require__(20);

var _SubscribeForm2 = _interopRequireDefault(_SubscribeForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostDetail = function (_Component) {
	_inherits(PostDetail, _Component);

	function PostDetail() {
		_classCallCheck(this, PostDetail);

		return _possibleConstructorReturn(this, (PostDetail.__proto__ || Object.getPrototypeOf(PostDetail)).apply(this, arguments));
	}

	_createClass(PostDetail, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			/* call action creator */
			/* action creator will grab the post with this id from the API   */
			/* and send it to the reducer */
			/* reducer will add it to the state */
			this.props.fetchPost(this.props.params.slug);
			this.props.fetchSettings();
		}
	}, {
		key: 'renderEditButton',
		value: function renderEditButton() {
			/* Render "Edit Post" button if user is logged in */
			if (this.props.authenticated) {
				return _react2.default.createElement(
					_reactRouterBootstrap.LinkContainer,
					{ to: { pathname: "/post/" + this.props.params.slug + "/edit" } },
					_react2.default.createElement(
						_reactBootstrap.Button,
						{ className: 'right' },
						'Edit Post'
					)
				);
			}
		}
	}, {
		key: 'renderMetaInfo',
		value: function renderMetaInfo() {
			var settings = this.props.settings;
			var post = this.props.post;

			if (!post) {
				return null;
			}
			/* Remove markdown from post body, and truncate it to 160 chars. */
			var body = (0, _removeMarkdown2.default)(this.props.post.body);
			var truncate_length = 160;
			var description = body.substring(0, truncate_length - 3) + "...";

			var firstline = post.body.split('\n')[0];
			var title = firstline.substring(0, 80);

			/* Keywords */
			var post_tags = "";
			if (post.tags) {
				post_tags = post.tags.map(function (tag) {
					return tag.title;
				}).join(",");
			}
			var keywords = settings.metaKeywords + ',' + post_tags;

			/* console.log("Meta" + JSON.stringify(settings));*/

			if (!settings.metaTitle) {
				return null;
			}

			return _react2.default.createElement(
				_reactMetaTags2.default,
				null,
				_react2.default.createElement(
					'title',
					null,
					title
				),
				_react2.default.createElement('meta', { name: 'author', content: settings.metaAuthor }),
				_react2.default.createElement('meta', { name: 'description',
					content: description }),
				_react2.default.createElement('meta', { name: 'keywords',
					content: keywords }),
				_react2.default.createElement('meta', { property: 'og:title', content: title }),
				_react2.default.createElement('meta', { property: 'og:image', content: settings.metaSocialImage }),
				_react2.default.createElement('meta', { property: 'twitter:card', content: 'summary_large_image' }),
				_react2.default.createElement('meta', { property: 'twitter:image', content: settings.metaSocialImage })
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var post = this.props.post;

			if (!post.body) {
				return _react2.default.createElement('div', null);
			}
			/* console.log("Rendering post " + post);*/

			return _react2.default.createElement(
				'div',
				null,
				this.renderMetaInfo(),
				_react2.default.createElement(_Post2.default, { title: post.title,
					slug: post.slug,
					body: post.body,
					published: post.published,
					authenticated: this.props.authenticated,
					tags: post.tags,
					category: post.category }),
				_react2.default.createElement(
					'div',
					{ className: 'panel subscription-box' },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(
							'div',
							{ className: 'col-xs-12 col-sm-6 subscribe-cta' },
							'Liked this post? Subscribe to the updates!'
						),
						_react2.default.createElement(
							'div',
							{ className: 'col-xs-12 col-sm-6' },
							_react2.default.createElement(_SubscribeForm2.default, null)
						)
					)
				),
				_react2.default.createElement('br', null)
			);
		}
	}]);

	return PostDetail;
}(_react.Component);

// Actions required to provide data for this component to render in sever side.


PostDetail.contextTypes = {
	router: _react.PropTypes.object
};
PostDetail.need = [function () {
	return (0, _index.fetchSettings)();
}, function () {
	return (0, _index.fetchPost)();
}];

function mapStateToProps(state) {
	return { post: state.post,
		settings: state.settings,
		authenticated: state.auth.authenticated };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchPost: _index.fetchPost, fetchSettings: _index.fetchSettings })(PostDetail);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(3);

var _reactMetaTags = __webpack_require__(13);

var _reactMetaTags2 = _interopRequireDefault(_reactMetaTags);

var _index = __webpack_require__(2);

var _Post = __webpack_require__(8);

var _Post2 = _interopRequireDefault(_Post);

var _Editor = __webpack_require__(19);

var _Editor2 = _interopRequireDefault(_Editor);

var _Pagination = __webpack_require__(53);

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostList = function (_Component) {
			_inherits(PostList, _Component);

			function PostList() {
						_classCallCheck(this, PostList);

						return _possibleConstructorReturn(this, (PostList.__proto__ || Object.getPrototypeOf(PostList)).apply(this, arguments));
			}

			_createClass(PostList, [{
						key: 'fetchAndFilterPosts',
						value: function fetchAndFilterPosts() {
									var page = this.props.location.query.page;
									var filter = { category: "",
												tag: "",
												currentPage: page };
									if (this.props.params.category) {
												filter.category = this.props.params.category;
									}
									if (this.props.params.tag) {
												filter.tag = this.props.params.tag;
									}

									this.props.fetchPosts(filter);
						}
			}, {
						key: 'componentWillMount',
						value: function componentWillMount() {
									/* console.log(">>>> src/components/post_list.js:");
            console.log("Calling fetchPosts() action creator.");		*/
									/* Fetch posts when the app loads */
									this.fetchAndFilterPosts();
									this.props.fetchSettings();
						}
			}, {
						key: 'componentDidUpdate',
						value: function componentDidUpdate(nextProps) {
									if (this.props.route.path !== nextProps.route.path || nextProps.params.tag !== this.props.params.tag || nextProps.location.query.page !== this.props.location.query.page) {
												/* If the route has changed - refetch the posts.
               Gotta check if route is different with the if statement,
               without the if statement it will fetch posts,
               which will update props, which will fetch them again,
               in infinite loop.
               comparing route.path's  checks if I've switched
               between "/" and "/category/some-category"
               copmaring params checks if I've switched
               between "/category/" and "/category/some-other-category"
             */
												this.fetchAndFilterPosts();
									}
						}
			}, {
						key: 'renderPosts',
						value: function renderPosts() {
									var _this2 = this;

									var posts = this.props.posts;
									/* console.log(">>>> src/components/post_list.js:");*/
									/* console.log("Rendering posts." + JSON.stringify(posts));*/

									/* If there are no posts in the state (haven't fetched them yet) -
            render an empty div in their place. */
									if (!posts) {
												return _react2.default.createElement('div', null);
									};
									if (posts.length == 0) {
												return _react2.default.createElement(
															'div',
															null,
															_react2.default.createElement('br', null),
															_react2.default.createElement(
																		'p',
																		null,
																		'No posts here yet.'
															)
												);
									};

									return posts.map(function (post) {
												if (post.published || _this2.props.authenticated) {
															/* Generate the list of posts. */
															/* Published posts are visible to everyone,
                  authenticated user can see both published and drafts */
															return _react2.default.createElement(_Post2.default, { key: post.slug,
																		title: post.title,
																		slug: post.slug,
																		body: post.body,
																		published: post.published,
																		authenticated: _this2.props.authenticated,
																		tags: post.tags,
																		truncate: 100,
																		link: '/post/' + post.slug });
												}
									});
						}
			}, {
						key: 'renderMetaInfo',
						value: function renderMetaInfo() {
									var settings = this.props.settings;

									if (!settings.metaTitle) {
												return null;
									}

									return _react2.default.createElement(
												_reactMetaTags2.default,
												null,
												_react2.default.createElement(
															'title',
															null,
															settings.metaTitle
												),
												_react2.default.createElement('meta', { name: 'author', content: settings.metaAuthor }),
												_react2.default.createElement('meta', { name: 'description',
															content: settings.metaDescription }),
												_react2.default.createElement('meta', { name: 'keywords',
															content: settings.metaKeywords }),
												_react2.default.createElement('meta', { property: 'og:title', content: settings.metaTitle }),
												_react2.default.createElement('meta', { property: 'og:image', content: settings.metaSocialImage }),
												_react2.default.createElement('meta', { property: 'twitter:card', content: 'summary_large_image' }),
												_react2.default.createElement('meta', { property: 'twitter:image', content: settings.metaSocialImage })
									);
						}
			}, {
						key: 'render',
						value: function render() {
									return _react2.default.createElement(
												'div',
												null,
												this.renderMetaInfo(),
												this.props.authenticated ? _react2.default.createElement(_Editor2.default, { params: this.props.params, autopublish: true }) : null,
												this.renderPosts(),
												_react2.default.createElement(_Pagination2.default, { next: this.props.posts.next,
															prev: this.props.posts.previous,
															location: this.props.location })
									);
						}
			}]);

			return PostList;
}(_react.Component);

// Actions required to provide data for this component to render in sever side.


PostList.need = [function () {
			return (0, _index.fetchSettings)();
}, function () {
			return (0, _index.fetchPosts)();
}];

function mapStateToProps(state) {
			return { posts: state.posts,
						settings: state.settings,
						authenticated: state.auth.authenticated };
}
/* First argument connects redux state to the component,
   allowing to access it with "this.props.posts" */
/* Second argument connects the actions to the component,
   allowing me to fire them like "this.props.fetchPosts()" */
exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchPosts: _index.fetchPosts, fetchSettings: _index.fetchSettings })(PostList);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(15);

var _index = __webpack_require__(2);

var _reactBootstrap = __webpack_require__(5);

var _reactRouterBootstrap = __webpack_require__(14);

var _reactSimplemdeEditor = __webpack_require__(29);

var _reactSimplemdeEditor2 = _interopRequireDefault(_reactSimplemdeEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* IMPORTANT:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Now I am using the PostEdit component for both creating and editing posts.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  I am keeping this component as an example of validating the form.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/* 
<FormControl componentClass="textarea"
placeholder="Write here..."
{...body} />
*/

var PostNew = function (_Component) {
			_inherits(PostNew, _Component);

			function PostNew(props) {
						_classCallCheck(this, PostNew);

						var _this = _possibleConstructorReturn(this, (PostNew.__proto__ || Object.getPrototypeOf(PostNew)).call(this, props));

						_this.state = {
									textValue: ""
						};
						return _this;
			}
			/* Access properties from context */
			/* Router creates context, and this thing takes it */


			_createClass(PostNew, [{
						key: 'onTextChange',
						value: function onTextChange(value) {
									this.setState({
												textValue: value
									});
						}
			}, {
						key: 'onSubmit',
						value: function onSubmit(props) {
									var title = props.title,
									    tags = props.tags;

									var body = this.state.textValue;

									var post = {
												title: title,
												body: body,
												tags: tags
									};

									/* createPost returns a promise */
									this.props.createPost(post);
						}
			}, {
						key: 'render',
						value: function render() {
									/* same as
            const title = this.props.fields.title; */
									var _props = this.props,
									    _props$fields = _props.fields,
									    title = _props$fields.title,
									    body = _props$fields.body,
									    tags = _props$fields.tags,
									    handleSubmit = _props.handleSubmit;


									return _react2.default.createElement(
												'div',
												null,
												_react2.default.createElement(
															'form',
															{ onSubmit: handleSubmit(this.onSubmit.bind(this)) },
															_react2.default.createElement(
																		_reactBootstrap.FormGroup,
																		null,
																		_react2.default.createElement(
																					_reactBootstrap.ControlLabel,
																					null,
																					title.touched ? title.error : ''
																		),
																		_react2.default.createElement(_reactBootstrap.FormControl, _extends({ className: 'postTitle',
																					type: 'text',
																					placeholder: 'Post Title'
																		}, title)),
																		_react2.default.createElement(_reactSimplemdeEditor2.default, {
																					onChange: this.onTextChange.bind(this),
																					options: {
																								spellChecker: false,
																								placeholder: "Write here...",
																								initialValue: this.state.textValue
																					} }),
																		_react2.default.createElement(_reactBootstrap.FormControl, _extends({ className: 'postTags',
																					type: 'text',
																					placeholder: 'tag1, tag2, tag3'
																		}, tags)),
																		_react2.default.createElement('br', null),
																		_react2.default.createElement(
																					'div',
																					{ className: 'right' },
																					_react2.default.createElement(
																								_reactRouterBootstrap.IndexLinkContainer,
																								{ to: { pathname: '/' } },
																								_react2.default.createElement(
																											_reactBootstrap.Button,
																											{ type: 'submit' },
																											'Cancel'
																								)
																					),
																					' \xA0',
																					_react2.default.createElement(
																								_reactBootstrap.Button,
																								{ bsStyle: 'primary', type: 'submit' },
																								'Save'
																					)
																		)
															),
															_react2.default.createElement('br', null),
															_react2.default.createElement('br', null)
												)
									);
						}
			}]);

			return PostNew;
}(_react.Component);

PostNew.contextTypes = {
			router: _react.PropTypes.object
};


function validate(values) {
			var errors = {};

			if (!values.title) {
						errors.title = 'Enter post title';
			}

			/* if error object has a key that matches one of the field names  */
			/* it will throw the error */
			return errors;
}

exports.default = (0, _reduxForm.reduxForm)({
			form: 'PostNewForm',
			fields: ['title', 'body', 'tags'],
			validate: validate
}, null, { createPost: _index.createPost })(PostNew);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (ComposedComponent) {
	var Authentication = function (_Component) {
		_inherits(Authentication, _Component);

		function Authentication() {
			_classCallCheck(this, Authentication);

			return _possibleConstructorReturn(this, (Authentication.__proto__ || Object.getPrototypeOf(Authentication)).apply(this, arguments));
		}

		_createClass(Authentication, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				if (!this.props.authenticated) {
					this.context.router.push('/');
				}
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate(nextProps) {
				if (!nextProps.authenticated) {
					this.context.router.push('/');
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(ComposedComponent, this.props);
			}
		}]);

		return Authentication;
	}(_react.Component);

	Authentication.contextTypes = {
		router: _react2.default.PropTypes.object
	};


	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated };
	}

	return (0, _reactRedux.connect)(mapStateToProps)(Authentication);
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(15);

var _auth = __webpack_require__(18);

var actions = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signin = function (_Component) {
				_inherits(Signin, _Component);

				function Signin() {
								_classCallCheck(this, Signin);

								return _possibleConstructorReturn(this, (Signin.__proto__ || Object.getPrototypeOf(Signin)).apply(this, arguments));
				}

				_createClass(Signin, [{
								key: 'handleFormSubmit',
								value: function handleFormSubmit(_ref) {
												var username = _ref.username,
												    password = _ref.password;

												/* console.log(username, password);*/
												// log user in
												// signinUser comes from actions.
												// it is an action creator that sends an username/pass to the server
												// and if they're correct, saves the token
												this.props.signinUser({ username: username, password: password });
								}
				}, {
								key: 'renderAlert',
								value: function renderAlert() {
												if (this.props.errorMessage) {
																return _react2.default.createElement(
																				'div',
																				{ className: 'alert alert-danger' },
																				this.props.errorMessage
																);
												}
								}
				}, {
								key: 'render',
								value: function render() {
												/* props from reduxForm */
												var _props = this.props,
												    handleSubmit = _props.handleSubmit,
												    _props$fields = _props.fields,
												    username = _props$fields.username,
												    password = _props$fields.password;
												/* console.log(...username);*/

												return _react2.default.createElement(
																'form',
																{ onSubmit: handleSubmit(this.handleFormSubmit.bind(this)) },
																_react2.default.createElement(
																				'fieldset',
																				{ className: 'form-group' },
																				_react2.default.createElement(
																								'label',
																								null,
																								'Username:'
																				),
																				_react2.default.createElement('input', _extends({}, username, { className: 'form-control' }))
																),
																_react2.default.createElement(
																				'fieldset',
																				{ className: 'form-group' },
																				_react2.default.createElement(
																								'label',
																								null,
																								'Password:'
																				),
																				_react2.default.createElement('input', _extends({}, password, { type: 'password', className: 'form-control' }))
																),
																this.renderAlert(),
																_react2.default.createElement(
																				'button',
																				{ action: 'submit', className: 'btn btn-primary' },
																				'Sign in'
																)
												);
								}
				}]);

				return Signin;
}(_react.Component);

function mapStateToProps(state) {
				return { errorMessage: state.auth.error };
}

exports.default = (0, _reduxForm.reduxForm)({
				form: 'signin',
				fields: ['username', 'password']
}, mapStateToProps, actions)(Signin);

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _auth = __webpack_require__(18);

var actions = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signout = function (_Component) {
			_inherits(Signout, _Component);

			function Signout() {
						_classCallCheck(this, Signout);

						return _possibleConstructorReturn(this, (Signout.__proto__ || Object.getPrototypeOf(Signout)).apply(this, arguments));
			}

			_createClass(Signout, [{
						key: 'componentWillMount',
						value: function componentWillMount() {
									// as soon as it renders - login user out
									console.log(">>>> src/components/auth/signout.js:");
									console.log("Calling signoutUser action creator.");
									this.props.signoutUser();
						}
			}, {
						key: 'render',
						value: function render() {
									return _react2.default.createElement(
												'div',
												null,
												'Signed out!'
									);
						}
			}]);

			return Signout;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(null, actions)(Signout);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var action = arguments[1];

				switch (action.type) {
								case 'AUTH_USER':
												return _extends({}, state, { error: '', authenticated: true });
								case 'UNAUTH_USER':
												return _extends({}, state, { error: '', authenticated: false });
								case 'AUTH_ERROR':
												return _extends({}, state, { error: action.payload });
								case 'FETCH_MESSAGE':
												return _extends({}, state, { message: action.payload });
				}

				return state;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { all: [] };
				var action = arguments[1];

				switch (action.type) {
								case 'FETCH_CATEGORIES':
												/* Action returns a list of posts */
												/* And this adds them to the state */
												/* (creating a new state object out of old state and fetchet categories) */
												/* console.log("Categories added to state: " + action.payload.data);*/
												return _extends({}, state, { all: action.payload.data });
								default:
												return state;
				}
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

exports.default = function () {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
				var action = arguments[1];

				switch (action.type) {
								case 'FETCH_POST':
												console.log("Fetched post " + action.payload.body);
												return action.payload;
								default:
												return state;
				}
};

var _index = __webpack_require__(2);

var INITIAL_STATE = [];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
				var action = arguments[1];

				switch (action.type) {
								case 'UPDATE_POST_BODY':
												/* console.log("Editing form " + JSON.stringify(state));*/
												var body = action.payload;
												return _extends({}, state, { body: body });
								case 'UPDATE_POST_TAGS':
												/* console.log("Editing form " + JSON.stringify(state));*/
												var tags = action.payload;
												return _extends({}, state, { tags: tags });
								case 'CREATE_POST':
												return INITIAL_STATE;
								case 'SET_PUBLISHED':
												/* console.log("Editing form " + JSON.stringify(state));*/
												return _extends({}, state, { published: action.payload });
								case 'FETCH_POST':
												/* console.log("Fetched post " + action.payload.body);*/
												return action.payload;
								default:
												return state;
				}
};

var _index = __webpack_require__(2);

/* List of all posts and an active post  */
var INITIAL_STATE = {
				body: "",
				tags: "",
				published: false
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
	var action = arguments[1];

	switch (action.type) {
		case 'CREATE_POST':
			var posts = state;
			var post = action.payload;
			/* console.log("Created post " +  JSON.stringify(post));*/
			/* console.log("Add created post to the stream " + JSON.stringify(post));*/
			posts.unshift(post);
			/* console.log("Updated posts " + JSON.stringify(posts));*/
			return [].concat(_toConsumableArray(posts));
		case 'DELETE_POST':
			var slug = action.payload;
			var posts = state;
			posts = posts.filter(function (p) {
				return p.slug !== slug;
			});
			return [].concat(_toConsumableArray(posts));
		case 'FETCH_POSTS':
			var posts = action.payload;
			return posts;
		default:
			return state;
	}
};

var _index = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var INITIAL_STATE = [];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
				var action = arguments[1];

				switch (action.type) {
								case 'CREATE_SUBSCRIBER':
												return _extends({}, state, { subscribed: true });
								case 'SUBSCRIBED_CLOSE':
												return _extends({}, state, { subscribed: false });
								default:
												return state;
				}
};

var INITIAL_STATE = {
				subscribed: false
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

exports.default = function () {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
				var action = arguments[1];

				switch (action.type) {
								case 'FETCH_SETTINGS':
												/* Action returns a list of posts */
												/* And this adds them to the state */
												/* (creating a new state object out of old state and fetchet settings) */
												/* console.log("Settings added to state: " + JSON.stringify(action.payload));*/
												return action.payload;
								default:
												return state;
				}
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.person = person;
exports.outbox = outbox;
exports.inbox = inbox;

var _post = __webpack_require__(10);

var _post2 = _interopRequireDefault(_post);

var _cuid = __webpack_require__(26);

var _cuid2 = _interopRequireDefault(_cuid);

var _slug = __webpack_require__(32);

var _slug2 = _interopRequireDefault(_slug);

var _sanitizeHtml = __webpack_require__(31);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LUMEN = {
    "@context": "https://www.w3.org/ns/activitystreams",
    "type": "Person",
    "id": "https://lumenwrites.com/lumen/",
    "name": "Lumen",
    "preferredUsername": "lumen",
    "summary": "I make dumb jokes",
    "inbox": "https://lumenwrites.com/lumen/inbox/",
    "outbox": "https://lumenwrites.com/lumen/outbox/",
    "followers": "https://lumenwrites.com/lumen/followers/",
    "following": "https://lumenwrites.com/lumen/following/",
    "likes": "https://lumenwrites.com/lumen/likes/"
};

function person(req, res) {
    res.json(LUMEN);
}

/* Post stream example */
var POST_STREAM = [{
    "@context": "https://www.w3.org/ns/activitystreams",
    "type": "Post",
    "attributedTo": "https://lumenwrites.com/lumen/",
    "content": "Hello world!"
}];

/* Outbox of my activities */
function outbox(req, res) {
    _post2.default.find().sort('-dateAdded').exec(function (err, posts) {
        if (err) {
            res.status(500).send(err);
        }
        var activitystream = posts.map(function (post) {
            var activity = {
                "@context": "https://www.w3.org/ns/activitystreams",
                "type": "Post",
                "attributedTo": "https://lumenwrites.com/lumen/",
                "content": post.body
            };
            return activity;
        });
        res.json(activitystream);
    });
}

/* Inbox */
/* Receive objects like this:
{
   "@context": "https://www.w3.org/ns/activitystreams",
   "type": "Create",
   "id": "https://social.example/alyssa/posts/a29a6843-9feb-4c74-a7f7-081b9c9201d3",
   "to": ["https://chatty.example/ben/"],
   "author": "https://social.example/alyssa/",
   "object": {
     "type": "Note",
     "id": "https://social.example/alyssa/posts/49e2d03d-b53a-4c4c-a95c-94a6abf45a19",
     "attributedTo": "https://social.example/alyssa/",
     "to": ["https://chatty.example/ben/"],
     "content": "Say, did you finish reading that book I lent you?"
   }
}
*/
/* Grab posts out of them and create them. */
function inbox(req, res) {
    console.log("Receiving post " + JSON.stringify(req.body));
    var activity = req.body;
    if (activity.type == "Create") {
        var post = activity.object;
        // Sanitize inputs
        post.body = (0, _sanitizeHtml2.default)(post.content);

        var firstline = post.body.split('\n')[0];
        post.slug = (0, _slug2.default)(firstline) + "-" + _cuid2.default.slug();
        post = new _post2.default(post);

        post.save(function (err, post) {
            if (err) {
                res.status(500).send(err);
            }
            res.json(post);
        });
    }
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});
exports.getFeed = getFeed;

var _feed = __webpack_require__(77);

var _feed2 = _interopRequireDefault(_feed);

var _post = __webpack_require__(10);

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
						email: 'lumenwrites@gmail.com',
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
			filter.published = true;
			_post2.default.find(filter).sort('-dateAdded').exec(function (err, posts) {
						if (err) {
									res.status(500).send(err);
						}

						posts.forEach(function (post) {
									var link = "http://lumenwrites.com/post/" + post.slug;
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
						res.send(feed.atom1());
			});
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

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
        "href": "https://lumenwrites.com/feed/posts.atom"
    }, {
        "rel": "http://schemas.google.com/g/2010#updates-from",
        "type": "application/atom+xml",
        "href": "https://lumenwrites.com/feed/posts.atom"
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

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.test = test;

var _post = __webpack_require__(10);

var _post2 = _interopRequireDefault(_post);

var _cuid = __webpack_require__(26);

var _cuid2 = _interopRequireDefault(_cuid);

var _slug = __webpack_require__(32);

var _slug2 = _interopRequireDefault(_slug);

var _sanitizeHtml = __webpack_require__(31);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Get all posts */
function getPosts(req, res) {
   /* Filter by tag */
   var filter = {};
   if (req.query.tag) {
      var tag = req.query.tag;
      console.log("Posts filtered by tag: " + tag);
      filter = { tags: { $all: tag } };
   }

   /* Pagination */
   var perPage = 12;
   var page = 0;
   if (req.query.page) {
      page = req.query.page - 1;
   }

   _post2.default.find(filter).limit(perPage).skip(perPage * page).sort('-dateAdded').exec(function (err, posts) {
      if (err) {
         res.status(500).send(err);
      }
      res.json(posts);
   });
}

/* Get a single post */
function getPost(req, res) {
   console.log("Fetching post by slug " + req.params.slug);
   _post2.default.findOne({ slug: req.params.slug }).exec(function (err, post) {
      if (err) {
         res.status(500).send(err);
      }
      res.json(post);
   });
}

/* Save a post */
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

/* Update post  */
function updatePost(req, res) {
   var post = req.body;
   _post2.default.findOneAndUpdate({ slug: req.params.slug }, post, function (err, post) {
      if (err) {
         return next(err);
      }
      console.log("Updated post! " + JSON.stringify(post));
      return res.json(post);
   });
}

/* Delete a post  */
function deletePost(req, res) {
   _post2.default.findOne({ slug: req.params.slug }).exec(function (err, post) {
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

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jwt = __webpack_require__(79);
var config = __webpack_require__(9);
var User = __webpack_require__(22);
var Subscriber = __webpack_require__(73);

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

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settings = __webpack_require__(75);

exports.about = function (req, res, next) {
    return res.send(settings);
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Mongoose is ORM, like models.py in django */
var mongoose = __webpack_require__(6);
var validator = __webpack_require__(33);
var Schema = mongoose.Schema;
var bcrypt = __webpack_require__(25);

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

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _compression = __webpack_require__(44);

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = __webpack_require__(43);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = __webpack_require__(47);

var _path2 = _interopRequireDefault(_path);

var _cors = __webpack_require__(45);

var _cors2 = _interopRequireDefault(_cors);

var _morgan = __webpack_require__(46);

var _morgan2 = _interopRequireDefault(_morgan);

var _postsRoutes = __webpack_require__(39);

var _postsRoutes2 = _interopRequireDefault(_postsRoutes);

var _settingsRoutes = __webpack_require__(41);

var _settingsRoutes2 = _interopRequireDefault(_settingsRoutes);

var _feedsRoutes = __webpack_require__(37);

var _feedsRoutes2 = _interopRequireDefault(_feedsRoutes);

var _profilesRoutes = __webpack_require__(40);

var _profilesRoutes2 = _interopRequireDefault(_profilesRoutes);

var _ostatusRoutes = __webpack_require__(38);

var _ostatusRoutes2 = _interopRequireDefault(_ostatusRoutes);

var _activitypubRoutes = __webpack_require__(36);

var _activitypubRoutes2 = _interopRequireDefault(_activitypubRoutes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(7);

var _reactRedux = __webpack_require__(1);

var _server = __webpack_require__(48);

var _reactRouter = __webpack_require__(3);

var _store = __webpack_require__(35);

var _routes = __webpack_require__(34);

var _routes2 = _interopRequireDefault(_routes);

var _Main = __webpack_require__(16);

var _Main2 = _interopRequireDefault(_Main);

var _rootReducer = __webpack_require__(17);

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _fetchData = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize the Express Server


/* Routes */
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
server.use('/api/v1', _postsRoutes2.default);
server.use('/api/v1', _settingsRoutes2.default);
server.use('/api/v1', _profilesRoutes2.default);

/* OStatus Routes */
server.use('/', _ostatusRoutes2.default);
server.use('/', _activitypubRoutes2.default);
server.use('/', _feedsRoutes2.default);

/* Serve static files */
server.use('/styles', _express2.default.static(_path2.default.resolve(__dirname, '../client/styles')));
server.use('/media', _express2.default.static(_path2.default.resolve(__dirname, '../client/media')));
server.get('/bundle.js', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, '../client/dist/bundle.js'));
});

/* Send the rest of the requests to react. */
/* server.use((req, res) =>
   res.sendFile(path.resolve(__dirname, '../client/index.html')));*/

/* Server-side rendering */
/* React */


/* Importing my client */
/* creates store for both server and client: */

/* Loads routes which loads all the rest of the components */

/* Reducers */

/* This function will fetch the initial data I need to generate my state */


/* All the requests that arent caught by static files or api above are directed here */
/* This will pass them to the function that renders an app on the server */
server.use(renderClient);

function renderClient(req, res, next) {
    /* "routes" load all of my components
       I pass routes to the match, which, in combination with RouterContext,
       makes router work properly, passing the urls sent to the server to react router.*/
    (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirectLocation, renderProps) {
        if (err) {
            return res.status(500).end(renderError(err));
        }
        if (!renderProps) {
            return next();
        }

        /* Create a new empty Redux store*/
        var store = (0, _store.configureStore)();
        /* This function will execute all the action creators I need,
           and wait for them fetch all the data and put it into the store. */
        return (0, _fetchData.fetchComponentData)(store, renderProps.components, renderProps.params).then(function () {
            /* Now store is filled with fetched data */
            /* Pass it to the provider, which will use it to render components. */
            var html = (0, _server.renderToString)(_react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(_reactRouter.RouterContext, renderProps)
            ));

            // Grab the state from the store
            var initialState = store.getState();
            /* console.log("State after fetching: " + JSON.stringify(initialState));*/

            /* Take html made from my components, pass it to the function that
               will render the whole page, with header and all */
            res.send(renderFullPage(html, initialState));
        });
    });
}

function renderFullPage(html, initialState) {
    return '\n    <!doctype html>\n    <html>\n      <head>\n        <link rel="stylesheet" href="/styles/style.css">\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + ';\n        </script>\n        <script src="/bundle.js"></script>\n       </body>\n    </html>\n    ';
}

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

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settings = {
    title: "lumen<b>writes</b>",
    domain: "https://lumenwrites.com",
    categories: ["jokes", "meta", "other"],
    about: "I make dumb jokes.",
    metaTitle: "Lumen Writes",
    metaDescription: "I make dumb jokes",
    metaAuthor: "Lumen",
    metaKeywords: "Comedy, jokes, writing",
    googleAnalyticsCode: ""
};

settings.metaSocialImage = settings.domain + "/media/images/social.png";

module.exports = settings;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequence = sequence;
/**
 * Throw an array to it and a function which can generate promises
 * and it will call them sequentially, one after another
 */
function sequence(items, consumer) {
  var results = [];
  var runner = function runner() {
    var item = items.shift();
    if (item) {
      return consumer(item).then(function (result) {
        results.push(result);
      }).then(runner);
    }

    return Promise.resolve(results);
  };

  return runner();
}

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("feed");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("jwt-simple");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("remarkable");

/***/ })
/******/ ])));