import express from 'express';
import ProjectController from '../controllers/project.controller';
import TaskController from '../controllers/project-tasks.controller';

const router = express.Router();

//CRUM
// /projects
router.post('/create', ProjectController.createProject);
router.get('/get/:projectId', ProjectController.readProject);
router.get('/get/', ProjectController.readAllProjects);
router.patch('/update/:projectId', ProjectController.updateProject);
router.delete('/delete/:projectId', ProjectController.deleteProject);

//CRUM
// /tasks
router.post('/tasks/create', TaskController.createProjectTask);
//router.get('/tasks/get/:projectTaskId', TaskController.readProjectTask);
router.get('/tasks/get/', TaskController.readAllProjectTasks);
router.get('/tasks/get/:projectId', TaskController.readAllTasksByProjectId);
router.patch('/tasks/update/:projectTaskId', TaskController.updateProjectTask);
router.delete('/tasks/delete/:projectTaskId', TaskController.deleteProjectTask);

export = router;