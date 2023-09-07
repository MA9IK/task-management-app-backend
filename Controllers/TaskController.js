const TaskModel = require('../models/TaskModel');
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
  try {
    const { title, detail, status } = req.body;

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const createdBy = decoded.id;

    const task = await TaskModel.create({
      title: title,
      detail: detail,
      status: status,
      createdBy: createdBy
    });

    res.json(task);
  } catch (err) {
    res.status(400).json({ Error: 'Something went wrong' });
  }
};

const allTasks = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ auth: false });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const userId = decoded.id;

    const tasks = await TaskModel.find({ createdBy: userId });

    res.json(tasks);
  } catch (err) {
    res.status(400).json({ Error: 'Something went wrong' });
  }
};

const update = async (req, res) => {
  try {
    const { title, detail, status } = req.body;

    const id = req.params.id;

    const existingTask = await TaskModel.findById(id);

    if (!existingTask) {
      return res.status(404).json({ Error: 'Task not found' });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        title: title,
        detail: detail,
        status: status
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ Error: 'Something went wrong' });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;

    await TaskModel.findByIdAndDelete(id);

    res.json('deleted');
  } catch (err) {
    res.status(400).json({ Error: 'Something went wrong' });
  }
};

module.exports = {
  create,
  allTasks,
  update,
  remove
};
