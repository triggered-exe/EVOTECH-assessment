import express from 'express';
import isAuthenticated from '../middlewares/auth.middlewares.js';
import { createAdmin, adminLogin, adminLogout } from '../controllers/admin.controllers.js';

const router = express.Router();

router.route('/create').post(isAuthenticated, createAdmin);
router.route('/login').post( adminLogin);
router.route('/logout').post(isAuthenticated, adminLogout);

export default router;