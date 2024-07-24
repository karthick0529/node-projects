const Task = require('../models/task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const {title, description } = req.body;
    const task = new Task({ title, description, user: req.user._id });
    await task.save();
    res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
    const{id} = req.params;
    const {title, description } = req.body;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString())
        return res.status(401).json({ message: 'Unauthorized' });

    task.title = title;
    task.description = description;
    const updatedTask = await task.save();
    res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
    const{id} = req.params;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString())
        return res.status(401).json({ message: 'Unauthorized' });

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
};