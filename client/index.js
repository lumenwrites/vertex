/* Client entry point  */
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

/* Reducers */
import rootReducer from './reducers/rootReducer';

// Import Routes
import routes from './routes';

// Styles
import './styles/bootstrap.min.css';
import './styles/font-awesome.min.css';
import './styles/foundation-icons.css';
import './styles/simplemde.min.css';
import './styles/style.scss';

// Configrue and initialize store
import { configureStore } from './store';
const store = configureStore(window.__INITIAL_STATE__);

// Sign in
const token = localStorage.getItem('token');
// if user has a token - sign him in
if (token) {
    store.dispatch({ type: 'AUTH_USER' });
    /* console.log(">>>> src/index.js:");	    
     * console.log("localStorage contains token, so sign user in.");   */
}


render(
    <Provider store={store}>
	<Router history={browserHistory} routes={routes}>
	</Router>
    </Provider>,
    document.getElementById('root')
);



