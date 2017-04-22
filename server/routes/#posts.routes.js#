import { Router } from 'express';
import * as postsControllers from '../controllers/posts.controllers';
const router = new Router();

const passport = require('passport');
const passportService = require('../services/passport');
const requireAuth = passport.authenticate('jwt', {  session:false });

// Get all Posts
router.route('/posts').get(postsControllers.getPosts);

// Get one post by slug
router.route('/posts/:slug').get(postsControllers.getPost);

// Add a new Post
router.route('/posts').post(postsControllers.createPost);

// Update post
router.route('/posts/:slug').post(postsControllers.updatePost);
// Delete post
router.route('/posts/:slug').delete(postsControllers.deletePost);

router.route('/test').get(postsControllers.test);
router.route('/categories').get((req,res)=> res.send({hi:"Hello!"}));

export default router;
