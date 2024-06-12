import express from 'express';
import { Task } from '../models/taskModel.js';


const router = express.Router();

router.post('/', async(req, res) => {
    console.log('Received POST request to /task'); // Add this line for debugging
    try {
        if (!req.body.title || !req.body.description || !req.body.deadline || !req.body.priority) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            priority: req.body.priority,
        };
        const task = await Task.create(newTask);
        return res.status(201).json(task);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/', async(req, res) => {
    try {
        const task = await Task.find({});
        return res.json({
            count: task.length,
            data: task
        });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        return res.json(task);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})
router.put('/:id', async(req, res) => {
    try {
        if (!req.body.title ||
            !req.body.description ||
            !req.body.deadline ||
            !req.body.priority
        )

        {
            return res.send({
                message: 'send all required fields',
            });
        }

        const { id } = req.params;
        console.log(id);
        const result = await Task.findByIdAndUpdate(id, req.body);
        if (!result) {
            res.send({ message: 'task not found' });
        }
        res.send({ message: 'task is updated successfully' });


    } catch (error) {
        console.log(error);
        res.send({ message: error.message });

    }
})

router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const result = await Task.findByIdAndDelete(id);
        if (!result) {
            res.send({ message: 'task not found' });
        }
        res.send({ message: 'task is deleted successfully' });

    } catch (error) {
        console.log(error);
        res.send({ message: error.message });

    }
})
export default router;
