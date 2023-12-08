import express from 'express';
import { deleteUser, getUserDetails, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// router.get("/")
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/get-userdetails/:id", verifyToken, getUserDetails)


export default router;