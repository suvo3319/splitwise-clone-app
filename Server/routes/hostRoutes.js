import express from 'express';
import { addData } from '../controllers/hostController.js';

const hostRouter = express.Router();

hostRouter.post('/add-group', addData);

export default hostRouter;