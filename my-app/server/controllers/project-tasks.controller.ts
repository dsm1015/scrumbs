import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import ProjectTask from '../models/project-tasks.model';

const createProjectTask = (req: Request, res: Response, next: NextFunction) => {
    const { projectId, title, description, status } = req.body.project_task;

    const project_task = new ProjectTask({
        _id: new mongoose.Types.ObjectId(),
        projectId,
        title,
        description,
        status
    });

    return project_task
        .save()
        .then(project_task => res.status(201).json({project_task}))
        .catch(error => res.status(500).json({error}));
};

const readProjectTask = (req: Request, res: Response, next: NextFunction) => {
    const projectTaskId = req.params.projectTaskId;

    return ProjectTask.findById(projectTaskId)
        .then((project_task) => (project_task ? res.status(200).json({ project_task }) : res.status(404).json({ message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};

const readAllProjectTasks = (req: Request, res: Response, next: NextFunction) => {
    return ProjectTask.find()
        .then((project_tasks) => res.status(200).json({ project_tasks }))
        .catch((error) => res.status(500).json({error}));
};

const readAllTasksByProjectId = (req: Request, res: Response, next: NextFunction) => {
    const passedProjectId = req.params.projectId;
    return ProjectTask.find({projectId: passedProjectId})
        .then((project_tasks) => res.status(200).json({ project_tasks }))
        .catch((error) => res.status(500).json({error}));
}

const updateProjectTask = (req: Request, res: Response, next: NextFunction) => {
    const projectTaskId = req.params.projectTaskId;

    return ProjectTask.findById(projectTaskId)
        .then((project_task) => {
            if(project_task)
            {
                project_task.set(req.body.project_task);
                return project_task
                    .save()
                    .then((project_task) => res.status(201).json({project_task}))
                    .catch(error => res.status(500).json({error}));
            } else {
                res.status(404).json({ message: 'Not found'});
            }
        })
        .catch((error) => res.status(500).json({error}));
};

const deleteProjectTask = (req: Request, res: Response, next: NextFunction) => {
    const projectTaskId = req.params.projectTaskId;

    return ProjectTask.findByIdAndDelete(projectTaskId)
        .then((project_task: any) => (project_task ? res.status(201).json({message: 'deleted'}) : res.status(404).json({ message: 'Not Found'})))
        .catch((error) => res.status(500).json({error}));
};

export default { createProjectTask, readProjectTask, readAllProjectTasks, readAllTasksByProjectId, updateProjectTask, deleteProjectTask};