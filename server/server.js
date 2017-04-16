import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';

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

server.use(Express.static(path.resolve(__dirname, '../dist')));
server.use('/api/v1', postRoutes);
server.use('/api/v1/auth', authRoutes);

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
