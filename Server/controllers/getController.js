import path from 'path';
import rootDir from '../utils/pathUtil.js';
import fs from 'fs';
import { simplified } from '../utils/simplified.js';

const FILE_PATH = path.join(rootDir, 'data', 'groups.json');

export const fetchAll = (req,res,callback) => {
    fs.readFile(FILE_PATH, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            if (callback) {
                return callback(err, null);
            }
            return res.status(500).json({ error: 'Internal server error' });
        }

        let groups = JSON.parse(data);
        if (callback) {
            return callback(null, groups);
        }
        return res.status(200).json(groups);
    })

}

export const fetchById = (req,res) => { 
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Group ID is required' });
    }
    fetchAll(req,res, (err, groups) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        const group = groups.find(group => group.id === id);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        return res.status(200).json(group);
    })
}

export const fetchMembersById = (req, res) => {
    const groupId = req.params.groupId;
    if (!groupId) {
        return res.status(400).json({ error: 'Group ID is required' });
    }
    const memberId = req.params.memberId;
    if (!memberId) {
        return res.status(400).json({ error: 'Member ID is required' });
    }
    fetchAll(req, res, (err, groups) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        const group = groups.find(group => group.id === groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const member = group.members.find(member => member.id === memberId);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        return res.status(200).json(member);
    });
}

export const simplifiedExpences = (req,res) => {
    fs.readFile(FILE_PATH, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        let groups = JSON.parse(data);
        const groupId = req.params.groupId;
        const group = groups.find(g => g.id === groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        const simplifiedMembers = simplified(group.members || []);

        res.status(200).json(simplifiedMembers);
    });
}