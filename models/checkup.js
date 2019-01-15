var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CheckupSchema = new Schema({
    date: {
        type: Date
    },
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine'
    },
    incharge: {
        type: String
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

module.exports = mongoose.model('Checkup', CheckupSchema)