import express from 'express';
import { createUser } from '../controllers/user.controller.js';
const router = express.Router();

// basic crud operation 
// 1: Create one user 
router.post('/',createUser);


export default router;