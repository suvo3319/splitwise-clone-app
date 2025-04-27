import express from 'express';
import { addData, addMembers } from '../controllers/hostController.js';

const hostRouter = express.Router();

hostRouter.post('/add-group', addData);
hostRouter.post('/groups/:id/members', addMembers);

export default hostRouter;