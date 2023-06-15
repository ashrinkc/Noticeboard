import express from "express";
import verifyToken from "../middlewares/verifyToken";
import { addClass, getClass, joinClass } from "../controllers/classController";
const router = express.Router();

router.post("/addClass", verifyToken, addClass);
router.get("/getClass", verifyToken, getClass);
router.post("/joinClass", joinClass);
export default router;
