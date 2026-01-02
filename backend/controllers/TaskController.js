import Task from "../models/Task.js";
import User from "../models/User.js";

export async function createTask(req, res) {
    try {
        const {title, description, dueDate, priority} = req.body;
        if(!title || !description || !dueDate) {
            return res.status(404).json({msg: "title, description, dueDate not found"});
        }
        //get logged in user 
        const userId = req.user.id;
        const loggedInUser = await User.findById(userId);
        if(!loggedInUser) {
            return res.status(403).json({msg: "user not found"});
        }
        const task = await Task.create({title, description, dueDate, priority, user: loggedInUser});
        return res.status(201).json({msg: "task created successfully", task});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
    }
}
export async function updateTask(req, res) {
    // udpate task, only title, description, dueDate & priority
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(404).json({msg: "id not found"});
        }
        const {title, description, dueDate, priority} = req.body;
        if(!title || !description || !dueDate || !priority) {
            return res.status(404).json({msg: "title, description, dueDate & priority not found"});
        }
        const existingTask = await Task.findById(id);
        if(!existingTask) {
            return res.status(404).json({msg: `task not found with id ${id}`});
        }
        existingTask.title = title;
        existingTask.description = description;
        existingTask.dueDate = dueDate;
        existingTask.priority = priority;
        await existingTask.save();
        return res.status(200).json({msg: "task created successfully", task :existingTask});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export async function deleteTask(req, res) {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(404).json({msg: "id not found"});
        }
        await Task.deleteOne().where("_id").equals(id);
        return res.status(204).json({msg: `task deleted with id ${id}`});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// get methods
// id required for this one  
export async function getOneTask(req, res) {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(404).json({msg: "id not found"});
        }
        const task = await Task.findById(id);
        if(!task) {
            return res.status(404).json({msg: `task not found with id ${id}`});
        }
        res.status(200).json({msg: "task found", task});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// pagination based offset & limit 
// let say we have 100 items 
// if we set page size as 10 then there are 10 pages if we need 4th page 
// if we set page size as 5 then there are 20 pages 
export async function getTaskList(req, res) {
    try {
        const {pageNumber, limit} = req.query;
        const userId = req.user.id;
        if(pageNumber < 0 || limit < 0) {
            throw new Error("invalid query parameters");
        }
        const skipAmount = (pageNumber -1) * limit;
        const taskList = await Task.find({user: userId}).sort({status: 'asc', priority: 'asc', dueDate: 'asc'}).skip(skipAmount).limit(limit).exec();
        const totalCount = await Task.find({user: userId}).countDocuments();
        return res.status(200).json({msg: "task list", taskList, totalCount});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export async function markComplete(req, res) {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(404).json({msg: "id not found"});
        }
        const task = await Task.findById(id);
        if(!task) {
            return res.status(404).json({msg: `task not found with id ${id}`});
        }
        task.status = true;
        await task.save();
        return res.status(200).json({msg: "task marked completed", task});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}