const User = require('../models/user');

const bcrypt = require('bcrypt');

let getUsers = (res) => {
    User.find({})
        .exec((error, usersDB) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error: {
                        error,
                        message: 'No se pudo obtener todos los usuarios'
                    }
                });
            }

            res.json({
                ok: true,
                users: usersDB
            })
        });
}

let getDeletedUsers = (res) => {
    User.find({ enabled: false })
        .exec((error, usersDB) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error: {
                        error,
                        message: 'No se pudo obtener todos los usuarios eliminados'
                    }
                });
            }

            res.json({
                ok: true,
                users: usersDB
            })
        });
}

let getUser = (id_user, res) => {
    User.findById(id_user, (error, userDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error: {
                    error,
                    message: 'No se pudo obtener el usuario solicitado'
                }
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'No existe un usuario con ese id'
                }
            });
        }

        res.json({
            ok: true,
            user: userDB
        })
    });
}

let createUser = (body, res) => {
    let user = new User({
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        image: body.image,
        role: body.role
    });

    user.save((error, userDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error: {
                    error,
                    message: 'No se pudo crear el nuevo usuario'
                }
            });
        }

        return res.json({
            ok: true,
            user: userDB //TODO: esto es para ver como se crean, despues borrarlo.
        });
    })
}

let deleteUser = (id_user, res) => {
    User.findById(id_user, (error, userDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error: {
                    error,
                    message: 'No se pudo obtener el usuario solicitado'
                }
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'No existe un usuario con ese id'
                }
            });
        }

        userDB.enabled = false;

        userDB.save((error, userSAVED) => {
            res.json({
                ok: true,
                user: userSAVED
            })
        });
    });
}

let updateUser = (id_user, body, res) => {
    User.findById(id_user, (error, userDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error: {
                    error,
                    message: 'No se pudo obtener el usuario solicitado'
                }
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'No existe un usuario con ese id'
                }
            });
        }

        userDB.name = body.name;
        userDB.lastname = body.lastname;
        // userDB.image = image; //TODO: falta implementar subida de imagenes

        userDB.save((error, userSAVED) => {
            res.json({
                ok: true,
                user: userSAVED
            })
        });
    });
}

module.exports = {
    createUser,
    getUsers,
    getDeletedUsers,
    getUser,
    deleteUser,
    updateUser,
}