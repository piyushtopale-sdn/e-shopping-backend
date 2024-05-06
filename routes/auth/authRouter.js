import express from 'express';
const authRouter = express.Router();
import multer from "multer";
import { storage } from "../../config/multer.config"
const upload = multer({ storage: storage });
import { SignUp}  from '../../controllers/auth/authController';

authRouter.post("/sign-up", SignUp);
router.post("/add-agent", [upload.single('image')], validateAgent, createAgent);
// authRouter.post("/login", Login);
// authRouter.post("/password-reset", Forgetpassword);
// authRouter.post("/resetpassword", ResetPassword);
// authRouter.put("/update-user/:_id",[upload.single('image')], updateProfile);


module.exports= authRouter

