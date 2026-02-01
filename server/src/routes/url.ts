import { Router } from 'express';
import { urlControllers } from "../controllers";
import apiLimiter from "../middleware/rateLimiter";

const router = Router();

router.route("/url").post(apiLimiter, urlControllers.createShortUrl)

export default router;