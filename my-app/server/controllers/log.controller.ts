import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Log from '../models/log.model'

const readAllLogsByTime = (req: Request, res: Response, next: NextFunction) => {
    
    const start = new Date(req.params.start);
    const end = new Date(req.params.end);
    console.log(start, end);
    if(start && end){
        return Log.find({timestamp: {$gt: start, $lt: end}})
            .then((logs) => res.status(200).json({ logs }))
            .catch((error) => res.status(500).json({error}));
    }
    return res.status(404).json({message: "no params provided"});
};

export default {readAllLogsByTime};