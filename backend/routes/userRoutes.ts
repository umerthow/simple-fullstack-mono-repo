import express from "express";
import {
  fetchUserData,
  updateUserData,
  fetchUserList,
  createUser,
} from "../controllers/user";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.get("/user/:id", fetchUserData);
router.put("/user/:id", updateUserData);
router.get("/users", fetchUserList);
router.post("/user", createUser);

export default router;
