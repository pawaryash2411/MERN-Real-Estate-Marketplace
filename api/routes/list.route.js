import express from 'express';
import { createListing, deleteListing, getAllListing, getSingleListing, updateListing, viewUserListing, } from '../controllers/listing.controller.js';
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router();

router.post("/create", verifyToken, createListing)
router.get("/view/:id", verifyToken, viewUserListing)
router.delete("/delete/:id", verifyToken, deleteListing)
router.put("/update/:id", verifyToken, updateListing)
router.get("/get-singlelisting/:id", getSingleListing)
router.get("/get-alllisting", getAllListing)

export default router;