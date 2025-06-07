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
    if (!Array.isArray(members)) {
        return res.status(400).json({ error: 'Members should be an array' });
    }

    const formattedMembers = members.map(member => ({
        id: nanoid(),
        name: member 
    }));
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

        groups[groupIndex].members = formattedMembers;

        fs.writeFile(FILE_PATH, JSON.stringify(groups), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(groups[groupIndex]);
        });
    })
}

export const memberExpense = (req, res) => {
    const { groupId, memberId } = req.params;
    const { owed, debt } = req.body;

    if (!groupId || !memberId || (typeof owed !== 'number' && typeof debt !== 'number')) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    if ((owed === undefined && debt === undefined)) {
        return res.status(400).json({ error: 'Either owed or debt must be provided' });
    }

    fs.readFile(FILE_PATH, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        let groups = JSON.parse(data);
        const groupIndex = groups.findIndex(group => group.id === groupId);

        if (groupIndex === -1) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const members = groups[groupIndex].members || [];
        const memberIndex = members.findIndex(member => member.id === memberId);

        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Member not found' });
        }

        // Member found, update owed or debt
        if (typeof owed === 'number') {
            members[memberIndex].owed = (members[memberIndex].owed || 0) + owed;
        } 
        if (typeof debt === 'number') {
            members[memberIndex].debt = (members[memberIndex].debt || 0) + debt;
        }

        groups[groupIndex].members = members;

        fs.writeFile(FILE_PATH, JSON.stringify(groups), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(groups[groupIndex]);
        });
    });
};



