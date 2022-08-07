const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewScheme = new Schema({
    reciever: {
        type: String,
        required: true
    },
    by: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    content:{
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('reviews', reviewScheme)