import express from 'express';
import { router as authRouter } from './auth.js';
const router = express.Router();

router.use('/auth', authRouter);

export { router };
