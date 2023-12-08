import express from 'express';
import { googleAuth, login, signOut, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/sign-up", signup)
router.post("/sign-in", login)
router.post("/google-auth", googleAuth)
router.get("/sign-out", signOut)

export default router;