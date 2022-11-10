// equivalent of older: const express = require('express')
import * as express from 'express';
import { routes } from './routes'; 
const app = express.default();

// Allow any method from any host and log requests
app.use((req: { method: string; ip: any; url: any; }, res: { header: (arg0: string, arg1: string) => void; sendStatus: (arg0: number) => void; }, next: () => void) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, HEAD, POST, PUT, DELETE');
    if('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});
// Handle POST requests that come in formatted as JSON
app.use(express.json());

// use routes
app.use('/', routes);

// start our server on port 4201
app.listen(4201, '127.0.0.1', function() {
    console.log("Server now listening on 4201");
});