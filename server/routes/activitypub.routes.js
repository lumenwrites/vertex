import { Router } from 'express';
import * as ActivityPubControllers from '../controllers/activitypub.controllers';
const router = new Router();

// Get all ActivityPub
router.route('/lumen/').get(ActivityPubControllers.person);
router.route('/lumen/inbox').post(ActivityPubControllers.inbox);
router.route('/lumen/outbox').get(ActivityPubControllers.outbox);

export default router;
