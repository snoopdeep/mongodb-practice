import express from 'express';
const router = express.Router;
import { createPosts } from '../controllers/post.controller';

router.post('/',createPosts);

export default router;