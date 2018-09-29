const mongoose = require('mongoose');
const config = require('./config').database;

var connection = mongoose.createConnection(config);

const UserSchema  = mongoose.Schema({

    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    
    registrationDate:{
        type: Date,
        default: Date.now
    }



});

const User = module.exports = connection.model('User', UserSchema)

