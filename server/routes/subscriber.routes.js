import { Router } from 'express';
import * as SubscriberControllers from '../controllers/subscriber.controllers';
const router = new Router();

// Get all Posts
router.route('/subscribe').post(SubscriberControllers.subscribe);

export default router;
