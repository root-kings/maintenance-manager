var Machine = require('../models/machine')

// API -----
exports.machine_detail_get = (req, res) => {
    Machine.findById(req.params.id).populate('checkup.history').exec((err, result) => {
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
    Machine.find({}).select('_id name').exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send(false)

    })
}

exports.machine_create_post = (req, res) => {
    let newmachine = new Machine({
        name: req.body.name,
        location: {
            sector: req.body.sector,
            number: req.body.number,
            shop: req.body.shop
        },
        incharge: req.body.incharge,
        checkup: {

            interval: {
                value: req.body.interval,
                unit: req.body.unit
            }
        }
    })
    newmachine.save(err => {
        if (err) return res.status(500).send(err)

        return res.send(newmachine)
    })

    // console.log(req.body)
    // res.send(false)

}




// Application -----