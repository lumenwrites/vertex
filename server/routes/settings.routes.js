import { Router } from 'express';
import * as SettingsController from '../controllers/settings.controllers';
const router = new Router();

// Get all Settingss
router.route('/settings').get(SettingsController.settings);

export default router;
