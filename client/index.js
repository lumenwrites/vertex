/* Client entry point  */
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { Provider } from 'react-redux';

/* Reducers */
import rootReducer from './reducers/rootReducer';

/* Config */

import config from '../config/config.js';

// Import Routes
import routes from './routes';

// Configrue and initialize store
import { configureStore } from './store';
const store = configureStore(window.__INITIAL_STATE__);

/* Google analytics */
import settings from '../config/settings.js';
import ReactGA from "react-ga";
ReactGA.initialize(settings.googleAnalyticsCode);
function logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    window.scrollTo(0, 0);
}

// Sign in
const token = localStorage.getItem('authtoken');
// if user has a token - sign him in
if (token) {
    store.dispatch({ type: 'AUTH_USER' });
    /* console.log(">>>> src/index.js:");	    
     * console.log("localStorage contains token, so sign user in.");   */
}

const history = useRouterHistory(createHistory)({
    basename: config.path
})
/* history={history}*/
/* basename={config.domain} */
render(
    <Provider store={store}>
	<Router history={browserHistory} routes={routes} onUpdate={logPageView} >
	</Router>
    </Provider>,
    document.getElementById('root')
);



