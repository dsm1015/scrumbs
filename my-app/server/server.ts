// equivalent of older: const express = require('express')
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';

import { config } from './config/config';
import DevLog from './security/dev.logger';
import ProdLog from './security/prod.logger';
import {verifyAdminToken, verifyToken} from './security/token';

// Log --Devlog only prints to console
const Log = DevLog;

//Route imports
import userRoutes from './routes/user.routes';
import loginRoutes from './routes/login.routes';
import teamRoutes from './routes/team.routes';
import projectRoutes from './routes/project.routes';
import logRoutes from './routes/log.routes';

const app = express();

// mongoDB
mongoose
    .connect(config.mongo.url)
    .then(() => {
        Log.log.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => {
        Log.log.error(error)
    });


// Allow any method from any host and log requests
const StartServer = () => {

    /** Log the request */
    app.use((req, res, next) => {
        /** Log the req */
        Log.log.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Log.log.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true}));
    // Handle POST requests that come in formatted as JSON
    app.use(express.json());

    // API RULES //
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if('OPTIONS' === req.method) {
            res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, HEAD, POST, PUT, DELETE, PATCH')
            return res.status(200).json({});
        }
        next();
    });
    
    // ROUTES //

        // PUBLIC //
        app.use('/login/', loginRoutes);

        // PROTECTED //
        app.use('/users/', verifyToken, userRoutes);
        app.use('/teams/', verifyToken, teamRoutes);
        app.use('/projects/', verifyToken, projectRoutes);
        app.use('/logs/', verifyToken, logRoutes);
    
        // PING CHECK //
        app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

        // ERROR HANDELING //
        app.use((req, res, next) => {
            const error = new Error("not found");
            //Log.error(error);
            return res.status(404).json({ message: error.message});
        });

    // START SERVER //
    http.createServer(app).listen(config.server.port, () => Log.log.info(`Server running on port ${config.server.port}`));
}