import express from 'express';
import { router as authRouter } from './auth.js';
// import { router as userRouter } from './user.js';
const router = express.Router();

router.use('/', authRouter);
// router.use('/user', userRouter);

export { router };