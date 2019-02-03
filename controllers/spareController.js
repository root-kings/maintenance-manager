var Spare = require('../models/spare')

var moment = require('moment')


// API -----
exports.spare_detail_get = (req, res) => {
    Spare.findById(req.params.id).exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.spares_get = (req, res) => {
    Spare.find({}, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.spares_list_get = (req, res) => {
    Spare.find({}).exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.spare_create_post = (req, res) => {
    let newspare = new Spare({
        name: req.body.name,
        // location: {
        //     sector: req.body.sector,
        //     number: req.body.number,
        //     shop: req.body.shop
        // },
        // incharge: req.body.incharge,
        // checkup: {

        //     interval: {
        //         value: req.body.interval,
        //         unit: req.body.unit
        //     }
        // }
    })

    newSpare.save(err => {
        if (err) return res.status(500).send(err)

        return res.redirect('/calibration')
    })

    // console.log(req.body)
    // res.send(false)

}

exports.spares_delete_all_get = (req, res) => {
    Spare.remove({}, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.spare_delete_post = (req, res) => {
    Spare.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(true)

        return res.send(false)

    })
}


// exports.spare_record_add_post = (req, res) => {
//     Spare.findOneAndUpdate({
//         _id: req.body.id
//     }, {
//         $push: {
//             "checkup.history": new moment(req.body.date)
//         }

//     }, {
//         safe: true,
//         upsert: true
//     }).exec((err, result) => {
//         if (err) return res.status(500).send(err)

//         if (result) return res.send(result)

//         return res.send(false)

//     })
// }