import express from 'express';
import controller from '../controllers/team.controller';

const router = express.Router();

//CRUM
router.post('/create', controller.createTeam);
router.get('/get/:teamId', controller.readTeam);
router.get('/get/', controller.readAllTeams);
router.patch('/update/:teamId', controller.updateTeam);
router.delete('/delete/:teamId', controller.deleteTeam);

export = router;