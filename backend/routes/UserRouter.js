import express from 'express'
import { dashboard, loginUser, registerUser } from '../controllers/UserController.js';
import { authenticateUser } from '../utils/JwtMiddleware.js';
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", authenticateUser, dashboard);

// expo
export default router;