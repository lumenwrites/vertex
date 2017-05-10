import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

/* Routes */
import postsRoutes from './routes/posts.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import feedsRoutes from './routes/feeds.routes.js';
import profilesRoutes from './routes/profiles.routes.js';
import ostatusRoutes from './routes/ostatus.routes.js';
import activitypubRoutes from './routes/activitypub.routes.js';

import config from '../config/config.js';

// Initialize the Express Server
const server = new Express();

// Connect to db.
mongoose.Promise = global.Promise;
var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/vertex';
console.log("Connecting to the db at " + MONGO_DB_URL);
mongoose.connect(MONGO_DB_URL, (error) => {
  if (error) {
      console.error('Please make sure Mongodb is installed and running!'); 
      throw error;
  }
});

// Serverly body Parser and server public assets and routes
server.use(compression());
server.use(bodyParser.json({ limit: '20mb' }));
server.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
/* server.use(morgan('combined'));*/
server.use(cors());

/* API Routes */
server.use('/api/v1', postsRoutes);
server.use('/api/v1', settingsRoutes);
server.use('/api/v1', profilesRoutes);


/* OStatus Routes */
server.use('/', ostatusRoutes);
server.use('/', activitypubRoutes);
server.use('/', feedsRoutes);

/* Serve static files */
server.use('/styles', Express.static(path.resolve(__dirname, '../client/styles')));
server.use('/media', Express.static(path.resolve(__dirname, '../client/media')));
server.get('/vertex.js',(req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/vertex.js'));
});

/* Send the rest of the requests to react. */
/* server.use((req, res) =>
   res.sendFile(path.resolve(__dirname, '../client/index.html')));*/

/* Server-side rendering */
/* React */
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Router } from 'react-router';
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import MetaTagsServer from 'react-meta-tags/server';
import {MetaTagsContext} from 'react-meta-tags';


/* Importing my client */
/* creates store for both server and client: */
import { configureStore } from '../client/store';
/* Loads routes which loads all the rest of the components */
import routes from '../client/routes';
import Main from '../client/components/Main'; 
/* Reducers */
import rootReducer from '../client/reducers/rootReducer';
/* This function will fetch the initial data I need to generate my state */
import { fetchComponentData } from './util/fetchData';

/* All the requests that arent caught by static files or api above are directed here */
/* This will pass them to the function that renders an app on the server */
server.use(renderClient);

function renderClient(req, res, next) {
    const metaTagsInstance = MetaTagsServer();

    /* "routes" load all of my components
       I pass routes to the match, which, in combination with RouterContext,
       makes router work properly, passing the urls sent to the server to react router.*/
    match({ routes, location: req.url}, (err, redirectLocation, renderProps) => {
	if (err) { return res.status(500).end(renderError(err)); }
	if (!renderProps) { return next(); }

	/* Create a new empty Redux store*/
	const store = configureStore()
	/* This function will execute all the action creators I need,
	   and wait for them fetch all the data and put it into the store. */
	return fetchComponentData(store, renderProps.components, renderProps.params)
	    .then(() => {
		/* Now store is filled with fetched data */
		/* Pass it to the provider, which will use it to render components. */
		renderProps.path="/blog";
		const html = renderToString(
		    <Provider store={store}>
			<MetaTagsContext extract={metaTagsInstance.extract}>
			    <RouterContext {...renderProps} path="/blog"/>
			</MetaTagsContext>
		    </Provider>
		)

		//get all title and metatags as string
		const meta = metaTagsInstance.renderToString();
		
		// Grab the state from the store
		const initialState = store.getState();
		/* console.log("State after fetching: " + JSON.stringify(initialState));*/

		/* Take html made from my components, pass it to the function that
		   will render the whole page, with header and all */
		res.send(renderFullPage(html, meta, initialState))
	    });
    });
}

function renderFullPage(html, meta, initialState) {
    return `
    <!doctype html>
    <html lang="en-us">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="${config.domain}/media/images/favicon.png"/>
        ${meta}
        <link rel="stylesheet" href="${config.domain}/styles/style.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>

       </body>
       <script src="${config.domain}/vertex.js"></script>
    </html>
    `
}


// start server
const port = process.env.PORT || 3000;
server.listen(port, (error) => {
  if (!error) {
      console.log(`Server is running on port ${port}!`);
  } else {
      console.error('Couldnt start server!'); 
  }
});

export default server;
