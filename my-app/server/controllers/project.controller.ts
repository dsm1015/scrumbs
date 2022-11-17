import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Team from '../models/team.model';
import Project from '../models/project.model'

const createProject = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, teams} = req.body.project;

    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        teams
    });

    return project
        .save()
        .then(project => res.status(201).json({project}))
        .catch(error => res.status(500).json({error}));
};

const readProject = (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;

    return Project.findById(projectId)
        .then((project) => (project ? res.status(200).json({ project }) : res.status(404).json({ message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};

const readAllProjects = (req: Request, res: Response, next: NextFunction) => {
    return Project.find()
        .then((projects) => res.status(200).json({ projects }))
        .catch((error) => res.status(500).json({error}));
};

const updateProject = (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;

    return Project.findById(projectId)
        .then((project) => {
            if(project)
            {
                project.set(req.body.project);
                return project
                    .save()
                    .then((project) => res.status(201).json({project}))
                    .catch(error => res.status(500).json({error}));
            } else {
                res.status(404).json({ message: 'Not found'});
            }
        })
        .catch((error) => res.status(500).json({error}));
};

const deleteProject = (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;

    return Project.findByIdAndDelete(projectId)
        .then((project) => (project ? res.status(201).json({message: 'deleted'}) : res.status(404).json({ message: 'Not Found'})))
        .catch((error) => res.status(500).json({error}));
};

export default { createProject, readProject, readAllProjects, updateProject, deleteProject};