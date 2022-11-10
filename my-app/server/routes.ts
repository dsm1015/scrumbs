import * as express from 'express';

export const routes = express.Router();

routes.post('/authenticate', (req, res) => res.send({test: 'test'}));

routes.get('/user-profile', (req, res) => res.send('test'));