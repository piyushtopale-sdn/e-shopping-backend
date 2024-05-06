import express, { Router } from "express";
const router = express.Router();
import multer from "multer";

import {createAdmin} from "../../controllers/admin/adminController";

import {validateAdmin} from '../../controllers/admin/admin.validate';


// Middlewares
import { verifyToken } from "../../middlewares/verifyToken";
// import { admin } from "../../middlewares/mustBe";

// Multer
import { storage } from "../../config/multer.config"
const upload = multer({ storage: storage });

// Global middleware and validation for admin route
// router.use([verifyToken, admin]);

//Admin Route
router.post("/add-admin", [upload.single('image')], validateAdmin, createAdmin);


export default router;