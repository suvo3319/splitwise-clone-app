import path from 'path';
import rootDir from '../utils/pathUtil.js';
import fs from 'fs';
import { nanoid } from 'nanoid';

const FILE_PATH = path.join(rootDir, 'data', 'groups.json');

export const addData = (req, res) => {
    const { groupName, groupDescription } = req.body;
    const newGroup = {
        id: nanoid(),
        name: groupName,
        description: groupDescription,
    };

    fs.readFile(FILE_PATH, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        let groups = JSON.parse(data);
        groups.push(newGroup);

        fs.writeFile(FILE_PATH, JSON.stringify(groups), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json(newGroup);
        });
    })
}