import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import postRoutes from './routes/post.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import feedsRoutes from './routes/feeds.routes.js';
import subscriberRoutes from './routes/subscriber.routes.js';
import authRoutes from './routes/auth.routes.js';
import ostatusRoutes from './routes/ostatus.routes.js';
import activitypubRoutes from './routes/activitypub.routes.js';

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
server.use('/api/v1', postRoutes);
server.use('/api/v1', settingsRoutes);
server.use('/api/v1', subscriberRoutes);
server.use('/api/v1/auth', authRoutes);


/* OStatus Routes */
server.use('/', ostatusRoutes);
server.use('/', activitypubRoutes);
server.use('/', feedsRoutes);

/* Serve static files */
server.use('/styles', Express.static(path.resolve(__dirname, '../client/styles')));
server.use('/media', Express.static(path.resolve(__dirname, '../client/media')));
server.get('/bundle.js',(req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/bundle.js'));
});
/* Send the rest of the requests to react. */
server.use((req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));


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
