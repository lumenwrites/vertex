import axios from 'axios';
import { browserHistory } from 'react-router';


export var API_URL = '/api/v1';
/* console.log("NODE_ENV " + process.env.NODE_ENV);*/
if (process.env.NODE_ENV === 'development' || true) {
    /* console.log("Connecting to API on localhost");*/
    API_URL = 'http://localhost:3000/api/v1';
}


export function updatePostBody(value) {
    return {
	type: 'UPDATE_POST_BODY',
	payload: value
    }
}

export function updatePostTags(value) {
    return {
	type: 'UPDATE_POST_TAGS',
	payload: value
    }
}


export function fetchPosts(filter) {
    var posts_url = `${API_URL}/posts/`;
    var page_url = "";
    if (filter) {
	if (filter.currentPage) {
	    page_url = "?page=" + filter.currentPage;
	}
	if (filter.category) {
	    /* Posts filtered by category */
	    posts_url = `${API_URL}/category/${filter.category}`
	}
	if (filter.tag) {
	    /* Posts filtered by tag */
	    posts_url = `${API_URL}/posts?tag=${filter.tag}`
	}
    }
    const url = posts_url + page_url;
    /* console.log("Fetching posts"); */
    return function(dispatch) {
	axios.get(url)
	     .then(response => {
		 /* console.log("Received posts " + JSON.stringify(response.data));*/
		 dispatch({
		     type: 'FETCH_POSTS',
		     payload: response.data
		 });
	     });
    };
}

export function fetchPost(slug) {
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Fetching post.");	    */
    
    return function(dispatch) {    
	axios.get(`${API_URL}/posts/${slug}/`)
	     .then(response => {
		 /* console.log("Successfully fetched post.");
		    console.log(response.data.body);*/
		 
		 dispatch({
		     type: 'FETCH_POST',
		     payload: response.data
		 });
	     });
    };
}


export function createPost(post) {
    // Get the saved token from local storage
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };

    return function(dispatch) {
	axios.post(`${API_URL}/posts`, post, config)
	     .then(response => {
		 browserHistory.push('/');
		 /* console.log(response);*/
		 dispatch({
		     type: 'CREATE_POST',
		     payload: response.data
		 });
	     });
    }
}


export function updatePost(slug, post) {
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Getting a token from localStorage. ");	    */

    /* Get the saved token from local storage */
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };

    /* console.log("Post Tags: " + post.tags);*/

    return function(dispatch) {
	axios.post(`${API_URL}/posts/${slug}`, post, config)
	     .then(response => {
		 console.log(">>>> src/actions/index.js:");
		 console.log("Updated a post. Redirecting to it. " + response.data.body ); 
		 browserHistory.push('/post/' + response.data.slug);
		 /* console.log(response);*/
		 dispatch({
		     type: 'UPDATE_POST',
		     payload: response
		 });
	     });
    }
}

export function deletePost(slug) {
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Deleting post.");	    */
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };
    
    return function(dispatch) {    
	axios.delete(`${API_URL}/posts/${slug}`, config)
	     .then(response => {
		 console.log(">>>> src/actions/index.js (promise):");
		 console.log("Successfully deleted post. Dispatching action DELETE_POST.");
		 browserHistory.push('/');

		 dispatch({
		     type: 'DELETE_POST',
		     payload: slug
		 });
	     });
    };
    
}



export function fetchCategories() {
    return function(dispatch) {    
	axios.get(`${API_URL}/categories/`)
	     .then(response => {
		 /* console.log("Categories fetched: " + response);*/
		 dispatch({
		     type: 'FETCH_CATEGORIES',
		     payload: response
		 });
	     });
    };
}

export function fetchSettings() {
    return function(dispatch) {    
	axios.get(`${API_URL}/settings/`)
	     .then(response => {
		 /* console.log("Settings fetched: " + JSON.stringify(response));*/
		 dispatch({
		     type: 'FETCH_SETTINGS',
		     payload: response
		 });
	     });
    };
}


export function createSubscriber(props) {
    return function(dispatch) {
	axios.post(`${API_URL}/subscribe`, props)
	     .then(response => {
		 /* browserHistory.push('/');*/
		 console.log(response);
		 dispatch({
		     type: 'CREATE_SUBSCRIBER',
		     payload: response
		 });
	     });
    }
}


export function subscribedClose() {
    return {
	type: 'SUBSCRIBED_CLOSE',
	payload: false
    }
}

