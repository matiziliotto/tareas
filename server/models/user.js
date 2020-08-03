var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

//===================
// User Schema
//===================
var userSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es requerido'] },
    lastname: { type: String, required: [true, 'El apellido es requerido'] },
    email: { type: String, required: [true, 'El email es requerido'], unique: true },
    password: { type: String, required: [true, 'La contraseña es requerida'] },
    image: { type: String, required: false },
    enabled: { type: Boolean, default: true },
    role: { type: String, default: 'USER_ROLE', enum: rolesValidos },
});

//===================
// This function remove from json the password column
//===================
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;

    return userObject;
};

userSchema.plugin(uniqueValidator, {
    message: 'El {PATH} ya existe y debe ser unico'
});

module.exports = mongoose.model('User', userSchema);