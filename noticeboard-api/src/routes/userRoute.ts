import express, { Router } from "express";
import {
  login,
  register,
  updatePassword,
  uploadImage,
} from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", verifyToken, updatePassword);
router.post("/img", verifyToken, uploadImage);
export default router;
