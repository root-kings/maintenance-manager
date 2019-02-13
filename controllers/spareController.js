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


exports.spare_create_post = (req, res) => {
	let newdate = new moment()
	let newspare = new Spare({
		case: req.body.case,
		incharge: {
			name: req.body.incharge,
			phone: req.body['incharge-phone'],
			email: req.body['incharge-email']
		},
		supplier: {
			name: req.body.supplier,
			phone: req.body['supplier-phone'],
			email: req.body['supplier-email']
		},

		requisition: {
			date: newdate
		},
		vetting: {
			date: new moment(newdate).add(5, 'days')
		},
		tod: {
			date: new moment(newdate).add(10, 'days')
		},
		tsc: {
			date: new moment(newdate).add(15, 'days')
		},
		so: {
			date: new moment(newdate).add(20, 'days')
		}
	})
	console.log(newspare)

	newspare.save(err => {
		if (err) return res.status(500).send(err)

		return res.redirect('/spares')
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

exports.spare_update_post = (req, res) => {
	let newspare = {
		case: req.body.case,
		incharge: {
			name: req.body.incharge,
			phone: req.body['incharge-phone'],
			email: req.body['incharge-email']
		},
		supplier: {
			name: req.body.supplier,
			phone: req.body['supplier-phone'],
			email: req.body['supplier-email']
		}
	}

	Spare.findOneAndUpdate(
		{
			_id: req.params.id
		},
		newspare,
		{
			safe: true,
			upsert: true
		}
	).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.redirect('/spares')

		return res.send(false)
	})

	// console.log(req.body)
	// res.send(false)
}

exports.spare_stage_update_post = (req, res) => {
	const stages = ['requisition', 'vetting', 'tod', 'tsc', 'so']

	state = {}

	state.stage = req.body.stage

	state[stages[req.body.stage]] = {
		date: new moment()
	}

	// console.log(state)

	Spare.findOneAndUpdate(
		{
			_id: req.params.id
		},
		state,
		{
			safe: true,
			upsert: true
		}
	).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(true)

		return res.send(false)
	})
}

exports.spare_stage_timer_update_post = (req, res) => {

	console.log(req.body)

	Spare.findOneAndUpdate(
		{
			_id: req.params.id
		},
		req.body,
		{
			safe: true,
			upsert: true
		}
	).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}