const Task = require('../models/task');

let getTasks = (res) => {
    Task.find({})
        .populate('user', 'name lastname email')
        .exec((error, tasksDB) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error: {
                        error,
                        message: 'No se pudo obtener todas las tareas'
                    }
                });
            }

            res.json({
                ok: true,
                tasks: tasksDB
            })
        });
}

let getTasksFinished = (res) => {
    Task.find({ finished: true })
        .populate('user', 'name lastname email')
        .exec((error, tasksDB) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error: {
                        error,
                        message: 'No se pudo obtener todas las tareas'
                    }
                });
            }

            res.json({
                ok: true,
                tasks: tasksDB
            })
        });
}

let createTask = (body, res) => {
    let task = new Task({
        title: body.title,
        description: body.description,
        user: body.id_user,
    });

    task.save((error, taskDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error: {
                    error,
                    message: 'No se pudo crear la nueva tarea'
                }
            });
        }

        return res.json({
            ok: true,
            task: taskDB //TODO: esto es para ver como se crean, despues borrarlo.
        });
    })
}

let updateTask = (id_task, body, res) => {
    Task.findById(id_task, (error, taskDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error: {
                    error,
                    message: 'No se pudo obtener la tarea solicitada'
                }
            });
        }

        if (!taskDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'No existe una tarea con ese id'
                }
            });
        }

        taskDB.title = body.title;
        taskDB.description = body.description;
        taskDB.finished = body.finished;

        taskDB.save((error, taskSAVED) => {
            res.json({
                ok: true,
                task: taskSAVED
            })
        });
    });
}

module.exports = {
    getTasks,
    getTasksFinished,
    createTask,
    updateTask,
}