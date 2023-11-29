import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

// router.get('/test',(req,res)=>{
//     res.json({
//         message:"Hello this is test"
//     })
// });
router.get('/test',test);


export default router;