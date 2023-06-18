import express from "express";
import verifyToken from "../middlewares/verifyToken";
import { createNotice, getNotice } from "../controllers/noticeController";
const router = express.Router();

router.post("/addNotice", verifyToken, createNotice);
router.get("/getNotice/:id", getNotice);

export default router;
