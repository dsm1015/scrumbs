import express from 'express';
import controller from '../controllers/login.controller';
import { verifyToken } from '../security/token';

const router = express.Router();

//LOGIN
router.post('', controller.login);
router.get('/role', verifyToken, controller.getRole);

export = router;