import express from 'express';
import { addData, addMembers, memberExpense } from '../controllers/hostController.js';

const hostRouter = express.Router();

hostRouter.post('/add-group', addData);
hostRouter.post('/groups/:id/members', addMembers);
hostRouter.post('/add-expences/:groupId/:memberId',memberExpense);

export default hostRouter;