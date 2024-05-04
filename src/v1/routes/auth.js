import express from 'express';
import * as authRequest from "../requests/auth_request.js";
import * as authController from "../controllers/auth_controller.js";
import { authenticationMiddleware } from "./../middlewares/auth_middleware.js"

const router = express.Router();

router.post("/verify_firebase_otp_token", [authRequest.verifyFirebaseTokenRequest], authController.verifyFirebaseToken);
router.post("/refresh", [], authController.refreshToken);

router.use((req, res, next) => authenticationMiddleware(req, res, next, 'user'));

router.get("/logout", [], authController.logOut);

export { router };
