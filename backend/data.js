const mongoose = require('mongoose');
const dataschema = mongoose.Schema({
     phone: {

        type: Number,

    },
    password :{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', dataschema);