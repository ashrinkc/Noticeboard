import express from "express";
import verifyToken from "../middlewares/verifyToken";
import {
  createNotice,
  deleteNotice,
  getNotice,
} from "../controllers/noticeController";
const router = express.Router();

router.post("/addNotice", verifyToken, createNotice);
router.get("/getNotice/:id", getNotice);
router.delete("/delete/:id", verifyToken, deleteNotice);
export default router;
