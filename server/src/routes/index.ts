import { Router } from 'express';
import urlRoutes from './url';
import { getUrl } from "../controllers/url";

const router = Router();

// Redirect Url Route
router.get('/:shortUrlId', getUrl)
// Other Routes
router.use('/api/v1', urlRoutes);

export default router;