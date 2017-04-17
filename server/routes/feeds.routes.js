import { Router } from 'express';
import * as FeedController from '../controllers/feed.controller';
const router = new Router();

// Get all Posts
router.route('/feed/posts.atom').get(FeedController.getFeed);

export default router;
