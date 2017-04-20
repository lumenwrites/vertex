import { Router } from 'express';
import * as postsControllers from '../controllers/posts.controllers';
const router = new Router();

// Get all Posts
router.route('/posts').get(postsControllers.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(postsControllers.getPost);

// Add a new Post
router.route('/posts').post(postsControllers.createPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(postsControllers.deletePost);

router.route('/test').get(postsControllers.test);
router.route('/categories').get((req,res)=> res.send({hi:"Hello!"}));

export default router;
