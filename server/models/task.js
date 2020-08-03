var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//===================
// Task Schema
//===================
var taskSchema = new Schema({
    title: { type: String, required: [true, 'El titulo es requerido'] },
    description: { type: String, required: [true, 'La descripcion es requerida'] },
    finished: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);