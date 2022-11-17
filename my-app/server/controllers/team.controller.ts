import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Team from '../models/team.model';

const createTeam = (req: Request, res: Response, next: NextFunction) => {
    const { name, scrum_master } = req.body.team;

    const team = new Team({
        _id: new mongoose.Types.ObjectId(),
        name,
        scrum_master,
    });

    return team
        .save()
        .then(team => res.status(201).json({team}))
        .catch(error => res.status(500).json({error}));
};

const readTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    return Team.findById(teamId)
        .then((team) => (team ? res.status(200).json({ team }) : res.status(404).json({ message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};

const readAllTeams = (req: Request, res: Response, next: NextFunction) => {
    return Team.find()
        .then((teams) => res.status(200).json({ teams }))
        .catch((error) => res.status(500).json({error}));
};

const updateTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    return Team.findById(teamId)
        .then((team) => {
            if(team)
            {
                team.set(req.body.team);
                return team
                    .save()
                    .then((team) => res.status(201).json({team}))
                    .catch(error => res.status(500).json({error}));
            } else {
                res.status(404).json({ message: 'Not found'});
            }
        })
        .catch((error) => res.status(500).json({error}));
};

const deleteTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    return Team.findByIdAndDelete(teamId)
        .then((team) => (team ? res.status(201).json({message: 'deleted'}) : res.status(404).json({ message: 'Not Found'})))
        .catch((error) => res.status(500).json({error}));
};

export default { createTeam, readTeam, readAllTeams, updateTeam, deleteTeam};