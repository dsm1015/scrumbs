import express from 'express';
import controller from '../controllers/log.controller';
import { verifyToken } from '../security/token';

const router = express.Router();

// LOG
router.get('/get/:start/:end', controller.readAllLogsByTime);

export = router;