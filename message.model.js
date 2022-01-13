const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title: {
        type: String,
        max: 255,
        required: true
    },
    body: {
        type: String,
        max: 255,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports.Message = Message;