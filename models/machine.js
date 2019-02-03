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

        interval: {
            value: {
                type: Number
            },
            unit: {
                type: String
            }
        },
        history: [{
            type: Date,

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
    .virtual('checkup.last')
    .get(function () {
        return moment(this.checkup.history.sort(function (date1, date2) {
            // This is a comparison function that will result in dates being sorted in
            // DESCENDING order.
            if (date1 > date2) return -1;
            if (date1 < date2) return 1;
            return 0;
        })[0]).format("DD MMM YYYY");
    });

MachineSchema
    .virtual('checkup.next')
    .get(function () {
        return moment(this.checkup.last, "DD MMM YYYY").add(this.checkup.interval.value, this.checkup.interval.unit).format("DD MMM YYYY");
    });


module.exports = mongoose.model('Machine', MachineSchema)