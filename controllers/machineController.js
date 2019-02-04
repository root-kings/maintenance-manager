var Machine = require('../models/machine')
// var Checkup = require('../models/checkup')

var moment = require('moment')


// API -----
exports.machine_detail_get = (req, res) => {
    Machine.findById(req.params.id).exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.machines_get = (req, res) => {
    Machine.find({}, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.machines_list_get = (req, res) => {
    Machine.find({}).exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.machine_create_post = (req, res) => {
    let newmachine = new Machine({
        name: req.body.name,
        // location: {
        //     sector: req.body.sector,
        //     number: req.body.number,
        //     shop: req.body.shop
        // },
        incharge: req.body.incharge,
        testing: req.body.testing,
        remark: req.body.remark,
        checkup: {

            interval: {
                value: req.body.interval,
                unit: req.body.unit
            }
        }
    })

    newmachine.save(err => {
        if (err) return res.status(500).send(err)

        return res.redirect('/calibration')
    })

    // console.log(req.body)
    // res.send(false)

}

exports.machines_delete_all_get = (req, res) => {
    Machine.remove({}, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.machine_delete_post = (req, res) => {
    Machine.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(true)

        return res.send(false)

    })
}


exports.machine_record_add_post = (req, res) => {
    Machine.findOneAndUpdate({
        _id: req.body.id
    }, {
        //remark: req.body.remark,
        $push: {
            "checkup.history": new moment(req.body.date)
        }

    }, {
        safe: true,
        upsert: true
    }).exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.machine_record_remove_post = (req, res) => {
    Machine.findOneAndUpdate({
        _id: req.body.id
    }, {
        $pull: {
            "checkup.history": new moment(req.body.date)
        }

    }, {
        safe: true,
        upsert: true
    }).exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

// Application -----

exports.machine_detail_view_get = (req, res) => {
    Machine.findById(req.params.id).exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.render('machine', {
            machine: result
        })

        return res.send(false)

    })
}