import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

var API_URL = 'http://localhost:3000/api/v1';
/* 
 * if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
 *     API_URL = process.env.BASE_URL ||
 * 	      (`http://localhost:${process.env.PORT || Config.port}/api/v1`);
 *     
 * }*/


export default function callApi(endpoint, method = 'get', body) {
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
