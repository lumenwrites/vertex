
import fetch from 'isomorphic-fetch';
import config from '../../config/config.js';


var API_URL = config.domain + '/api/v1';

if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:3000/api/v1';
}
console.log("API_URL " + API_URL);


export default function callApi(endpoint, method = 'get', body) {
    console.log("Calling api " + API_URL+"/"+endpoint);
    return fetch(`${API_URL}/${endpoint}`, {
	headers: { 'content-type': 'application/json' },
	method,
	body: JSON.stringify(body),
    })
	.then(response => response.json().then(json => ({ json, response })))
	.then(({ json, response }) => {
	    if (!response.ok) {
		return Promise.reject(json);
	    }

	    return json;
	})
	.then(
	    response => response,
	    error => error
	);
}

export {API_URL};
