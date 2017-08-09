/**
 * Main store function. Sets up store both on client, and on server-side rendering.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export function configureStore(initialState = {}) {
    // Middleware and store enhancers
    const enhancers = [
	applyMiddleware(thunk),
    ];

    const store = createStore(rootReducer, initialState, compose(...enhancers));

    return store;
}
