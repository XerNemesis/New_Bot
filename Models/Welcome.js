const {model, Schema} = require('mongoose');
const mongoose = require('mongoose');

const welcomeSchema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Msg: String,
    Role: String
});

module.exports = mongoose.model('Welcome', welcomeSchema);
