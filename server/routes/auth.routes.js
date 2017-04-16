import { Router } from 'express';
const router = new Router();

const passport = require('passport');
const authControllers = require('../controllers/auth.controller.js');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', {  session:false });
const requireSignin = passport.authenticate('local', {  session:false });

// Make every request go through the passport authentication check:
router.route('/').get(requireAuth, function(req, res){
    res.send({ message:'Successfully accessed protected API!'});
});

/* Take a request from a url and send a response. */
router.route('/join').post(authControllers.signup);
router.route('/login').post(requireSignin, authControllers.signin);

export default router;
