var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var SpareSchema = new Schema({
    case: {
        type: String,
        default: ""
    },

    requisition: {
        timeout: {
            type: Number
        },
        date: {
            type: Date
        }
    },
    vetting: {
        timeout: {
            type: Number
        },
        date: {
            type: Date
        }
    },
    tod: {
        timeout: {
            type: Number
        },
        date: {
            type: Date
        }
    },
    tsc: {
        timeout: {
            type: Number
        },
        date: {
            type: Date
        }
    },
    so: {
        timeout: {
            type: Number
        },
        date: {
            type: Date
        }
    },
    stage: {
        type: Number,
        min: 0,
        max: 4,
        default: 0,
        required: true
    },
    incharge: {
        name: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        }
    },
    supplier: {
        name: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        }
    },

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

// SpareSchema
//     .virtual('checkup.last')
//     .get(function () {
//         return moment(this.checkup.history.sort(function (date1, date2) {
//             // This is a comparison function that will result in dates being sorted in
//             // DESCENDING order.
//             if (date1 > date2) return -1;
//             if (date1 < date2) return 1;
//             return 0;
//         })[0]).format("DD MMM YYYY");
//     });

SpareSchema
    .virtual('currentstage')
    .get(function () {
        switch (this.stage) {
            case 0:
                return "requisition";
            case 1:
                return "vetting";
            case 2:
                return "toe";
            case 3:
                return "tsc";
            case 4:
                return "so";
            default:
                return "unknown";
        }

    });


module.exports = mongoose.model('Spare', SpareSchema)