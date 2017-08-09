import { Router } from 'express';
import * as feedsControllers from '../controllers/feeds.controllers';
const router = new Router();

// Get all Posts
router.route('/feed/posts.atom').get(feedsControllers.getFeed);

export default router;
