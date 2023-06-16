import express from "express";
import verifyToken from "../middlewares/verifyToken";
import {
  addClass,
  getClass,
  getJoinedClass,
  joinClass,
} from "../controllers/classController";
const router = express.Router();

router.post("/addClass", verifyToken, addClass);
router.get("/getClass", verifyToken, getClass);
router.post("/joinClass", verifyToken, joinClass);
router.get("/joinedClass", verifyToken, getJoinedClass);
export default router;
