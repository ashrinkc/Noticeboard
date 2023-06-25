import express from "express";
import verifyToken from "../middlewares/verifyToken";
import {
  addClass,
  deleteClass,
  getClass,
  getJoinedClass,
  getUsersJoined,
  joinClass,
  unjoinClass,
} from "../controllers/classController";
const router = express.Router();

router.post("/addClass", verifyToken, addClass);
router.get("/getClass", verifyToken, getClass);
router.post("/joinClass", verifyToken, joinClass);
router.get("/joinedClass", verifyToken, getJoinedClass);
router.get("/classUser/:id", getUsersJoined);
router.delete("/deleteClass/:id", verifyToken, deleteClass);
router.delete("/unjoinClass/:id", verifyToken, unjoinClass);
export default router;
