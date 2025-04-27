import path from 'path';
import rootDir from '../utils/pathUtil.js';
import fs from 'fs';

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