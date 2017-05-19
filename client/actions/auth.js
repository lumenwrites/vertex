import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

import {API_URL} from '../utils/apiCaller';

import config from '../../config/config.js';

var domain = config.domain;

export function signinUser({username, password}) {
    return function(dispatch) {
	// send username/password
	// .then - success, .catch - fail.
	console.log(">>>> src/actions/auth.js:");		
	console.log("Sending POST request from signinUser.");
	/* console.log("Username: " + username);
	   console.log("Password: " + password);	*/
	var credentials = {
		"email": username,
		"password": password
	}
	axios.post(`${API_URL}/auth/login`, credentials)
	     .then(response => {
		 console.log("Successfully signed in!");
		 // if request is good
		 // - update state to indicate that I'm signed in
		 dispatch({ type: 'AUTH_USER'});
		 console.log("Auth action dispatched(to flip auth state to true)");
		 // - save JWT token
		 localStorage.setItem('authtoken', response.data.token);
		 console.log("Token saved! " + response.data.token);
		 // - redirect to /feature
		 browserHistory.push(domain);
		 console.log("Redirected to /");		 

	     })
	     .catch(() => {
		 // if request is bad
		 dispatch(authError('Bad Login Info'));
	     })

    };
}


export function signupUser({username, password}) {
    return function(dispatch) {
	// send username/password
	// .then - success, .catch - fail.
	axios.post(`${API_URL}/signup`, {username, password})
	     .then(response => {
		 // if request is good
		 // - update state to indicate that I'm signed up
		 dispatch({ type: AUTH_USER});
		 // - save JWT token
		 localStorage.setItem('authtoken', response.data.token);
		 // - redirect to /feature
		 browserHistory.push(domain);
	     })
	     .catch(() => {
		 // if request is bad - add error to the state.
		     dispatch(authError('User with this username already exists'));
	     })

    };
}



export function signoutUser() {
    // delete token and signout
    console.log(">>>> src/actions/auth.js:");
    console.log("Signing out user, deleting token from localStorage.");		    
    localStorage.removeItem('authtoken');
    console.log("Redirecting to /, and dispatching action UNAUTH_USER.");
    browserHistory.push(domain);    
    return {
	type: 'UNAUTH_USER'
    };
}

export function authError(error) {
    return {
	type: AUTH_ERROR,
	payload: error
    };
}

export function fetchMessage() {
    const config = {
	headers:  { authorization: localStorage.getItem('authtoken')}
    };
    
    return function(dispatch) {
	axios.get('http://localhost:3000/api/v1/auth-test', config)
	     .then(response => {
		 console.log("Auth test " + JSON.stringify(response));
		 dispatch({
		     type: FETCH_MESSAGE,
		     payload: response.data.message
		 });
	     });
    }
}
