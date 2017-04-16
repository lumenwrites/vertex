import { Router } from 'express';
import * as OStatusControllers from '../controllers/ostatus.controllers';
const router = new Router();

// Get all OStatus
router.route('/.well-known/host-meta').get(OStatusControllers.hostMeta);
router.route('/.well-known/webfinger?resource=acct:lumen@lumenwrites.com').get(OStatusControllers.webFingerAccount);
	
/* router.route('/feeds/posts.atom').ostatus(OStatusControllers.createOStatus);*/

export default router;
