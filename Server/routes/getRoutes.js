import express from 'express';
import { fetchAll, fetchById, fetchMembersById, simplifiedExpences } from '../controllers/getController.js';

const getRouter = express.Router();

getRouter.get('/fetch-all', (req, res) => {fetchAll(req, res)});
getRouter.get('/fetch-by-id/:id', fetchById);
getRouter.get('/fetch-members-by-id/:groupId/:memberId', (req, res) => {fetchMembersById(req, res)});
getRouter.get('/simplified/:groupId',simplifiedExpences)

export default getRouter;