var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var MachineSchema = new Schema({
    name: {
        type: String
    },
    location: {
        sector: {
            type: String
        },
        number: {
            type: Number
        },
        shop: {
            type: String
        }
    },
    incharge: {
        type: String
    },
    checkup: {
        last: {
            type: Date
        },
        interval: {
            value: {
                type: Number
            },
            unit: {
                type: String
            }
        },
        history: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Checkup'
        }]
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

MachineSchema
    .virtual('checkup.next')
    .get(function () {
        return moment(this.checkup.last).add(this.checkup.interval.value, this.checkup.interval.unit);
    });


module.exports = mongoose.model('Machine', MachineSchema)