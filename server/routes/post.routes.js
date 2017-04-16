import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.createPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

router.route('/test').get(PostController.test);
router.route('/settings').get((req,res)=> res.send({hi:"Hello!"}));
router.route('/categories').get((req,res)=> res.send({hi:"Hello!"}));

export default router;
