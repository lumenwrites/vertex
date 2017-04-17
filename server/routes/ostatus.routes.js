import { Router } from 'express';
import * as OStatusControllers from '../controllers/ostatus.controllers';
const router = new Router();

// Get all OStatus
router.route('/.well-known/host-meta').get(OStatusControllers.hostMeta);
router.route('/.well-known/webfinger*').get(OStatusControllers.webFingerAccount);

router.route('/@lumen.feed').get(OStatusControllers.postStream);
/* router.route('/feeds/posts.atom').ostatus(OStatusControllers.createOStatus);*/

export default router;
