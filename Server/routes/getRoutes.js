import express from 'express';
import { fetchAll, fetchById } from '../controllers/getController.js';

const getRouter = express.Router();

getRouter.get('/fetch-all', (req, res) => {fetchAll(req, res)});
getRouter.get('/fetch-by-id/:id', fetchById)

export default getRouter;