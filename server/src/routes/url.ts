import { Router } from 'express';
import { urlControllers } from "../controllers";

const router = Router();

router.route("/url").post(urlControllers.createShortUrl)

export default router;