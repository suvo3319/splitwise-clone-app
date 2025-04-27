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

export const addMembers = (req,res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Group ID is required' });
    }
    const { members } = req.body;
    fs.readFile(FILE_PATH, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        let groups = JSON.parse(data);
        const groupIndex = groups.findIndex(group => group.id === id);

        if (groupIndex === -1) {
            return res.status(404).json({ error: 'Group not found' });
        }

        groups[groupIndex].members = members;

        fs.writeFile(FILE_PATH, JSON.stringify(groups), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(groups[groupIndex]);
        });
    })
}