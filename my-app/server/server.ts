// equivalent of older: const express = require('express')
import express from 'express';
import mongoose, { startSession } from 'mongoose'
import http from 'http';
import { config } from './config/config'
import Log from './server-log';

//Route imports
import userRoutes from './routes/user.routes'

const app = express();

// mongoDB
mongoose
    .connect(config.mongo.url)
    .then(() => {
        Log.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => {
        Log.error(error);
    });


// Allow any method from any host and log requests
const StartServer = () => {

    /** Log the request */
    app.use((req, res, next) => {
        /** Log the req */
        Log.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Log.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true}));
    // Handle POST requests that come in formatted as JSON
    app.use(express.json());

    // API RULES
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if('OPTIONS' === req.method) {
            res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, HEAD, POST, PUT, DELETE')
            return res.status(200).json({});
        }
        next();
    });
    
    // ROUTES
    app.use('/users/', userRoutes);
    
    // PING CHECK
    app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    // ERROR HANDELING
    app.use((req, res, next) => {
        const error = new Error("not found");
        Log.error(error);
        return res.status(404).json({ message: error.message});
    });

    // start our server on port 4201
    http.createServer(app).listen(config.server.port, () => console.log(`Server running on port ${config.server.port}`));
}