import { Router } from 'express';
import * as FeedController from '../controllers/feed.controller';
const router = new Router();

// Get all Posts
router.route('/feeds/posts').get(FeedController.getFeed);

export default router;
