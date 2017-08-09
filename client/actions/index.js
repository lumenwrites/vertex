import axios from 'axios';
import { browserHistory } from 'react-router';

/* Isomorphic api caller. Magically fetches data, both on client and server. */
import callApi from '../utils/apiCaller';

import {API_URL} from '../utils/apiCaller';
/* console.log("API_URL " + API_URL);*/

import config from '../../config/config.js';

console.log("config.domain " + config.domain);

var domain = config.domain;

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


export function setPublished(published) {
    return {
	type: 'SET_PUBLISHED',
	payload: published
    }
}


export function fetchPosts(filter) {
    var posts_url = `posts/`;
    var page_url = "";
    if (filter) {
	if (filter.currentPage) {
	    page_url = "?page=" + filter.currentPage;
	}
	if (filter.tag) {
	    /* Posts filtered by tag */
	    posts_url = `posts?tag=${filter.tag}`
	}
    }
    const url = posts_url + page_url;
    /* console.log("Fetching posts"); */
    return (dispatch) => {
	return callApi(posts_url).then(res => {
	    dispatch({
		type: 'FETCH_POSTS',
		payload: res
	    });
	});
    };
}

export function fetchPost(slug) {
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Fetching post. " + slug);	   */

    return (dispatch) => {
	return callApi(`posts/${slug}`).then(res => {
	    /* console.log("apiCaller response: " + JSON.stringify(res));*/
	    dispatch({
		type: 'FETCH_POST',
		payload: res
	    });
	});
    };
}


export function createPost(post) {
    // Get the saved token from local storage
    const config = {
	headers:  { authorization: localStorage.getItem('authtoken')}	
    };
    console.log("Sending token " + JSON.stringify(config));

    return function(dispatch) {
	axios.post(`${API_URL}/posts`, post, config)
	     .then(response => {
		 browserHistory.push(domain);
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
	headers:  { authorization: localStorage.getItem('authtoken')}		
    };

    /* console.log("Post Tags: " + post.tags);*/

    return function(dispatch) {
	axios.post(`${API_URL}/posts/${slug}`, post, config)
	     .then(response => {
		 console.log(">>>> src/actions/index.js:");
		 var post_url = domain+"/post/"+response.data.slug;
		 console.log("Updated a post. Redirecting to " + post_url); 
		 browserHistory.push(post_url);
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
	headers:  { authorization: localStorage.getItem('authtoken')}		
    };
    
    return function(dispatch) {    
	axios.delete(`${API_URL}/posts/${slug}`, config)
	     .then(response => {
		 console.log(">>>> src/actions/index.js (promise):");
		 console.log("Successfully deleted post. Dispatching action DELETE_POST.");
		 browserHistory.push(domain);

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

export function fetchSettings() {
    return (dispatch) => {
	return callApi('settings').then(res => {
	    /* console.log("apiCaller response: " + JSON.stringify(res));*/
	    dispatch({
		type: 'FETCH_SETTINGS',
		payload: res
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

