import { Router } from 'express';
const router = new Router();

const passport = require('passport');
const profilesControllers = require('../controllers/profiles.controllers.js');
const passportService = require('../services/passport');

const requireProfiles = passport.authenticate('jwt', {  session:false });
const requireSignin = passport.authenticate('local', {  session:false });

// Make every request go through the passport profilesentication check:
router.route('/').get(requireProfiles, function(req, res){
    res.send({ message:'Successfully accessed protected API!'});
});

/* Take a request from a url and send a response. */
router.route('/auth/join').post(profilesControllers.signup);
router.route('/auth/login').post(requireSignin, profilesControllers.signin);

/* Subscribe */
router.route('/subscribe').post(profilesControllers.subscribe);

export default router;

