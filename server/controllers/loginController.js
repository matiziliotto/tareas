const User = require('../models/user');

const bcrypt = require('bcrypt');

let login = (body, res) => {
    User.findOne({ email: body.email }, (error, userDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error: {
                    error,
                    message: 'Error al consultar el email'
                }
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Email y/o password incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Email y/o password incorrectos'
                }
            });
        }

        res.json({
            ok: true,
            userDB,
        })
    });
}

module.exports = {
    login,
}