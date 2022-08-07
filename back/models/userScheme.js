const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userScheme = new Schema({
    image: {
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rating:{
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('users', userScheme)