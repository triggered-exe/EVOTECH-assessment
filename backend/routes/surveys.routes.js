import express from 'express';
const router = express.Router();
import isAuthenticated from '../middlewares/auth.middlewares.js';
import { surveysHandler, getSurveys } from '../controllers/surveys.controllers.js';

router.route('/').post(surveysHandler);
router.route('/').get(isAuthenticated, getSurveys);

export default router;