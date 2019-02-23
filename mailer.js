const mongoose = require('mongoose')
const moment = require('moment')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg91 = require('msg91')('247111AI4S9E1P5bea6b3a', 'OFAJMA', '4')
const DBPORT = process.env.MONGODB_URI || 'mongodb://heroku_glpd1cfw:p4g2fbe0l74homdtpals7rg0cm@ds157574.mlab.com:57574/heroku_glpd1cfw'

mongoose.connect(DBPORT)
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// get list of all messgaes
var Machine = require('./models/machine')

Machine.find({}).exec((err, result) => {
	if (err) return console.error(err)
	// filter messages for today
	let todayMachines = result.filter(machine => moment(machine.reminder.next, 'DD MMM YYYY').isSame(moment(), 'day'))

	// console.log(todayMachines)

	let emails = []

	todayMachines.forEach(machine => {
		let email = {
			// to: ['dayshmookh_krushn.ghrcecs@raisoni.net'],
			to: machine.supplier.email.split(';'),
			from: 'Krushn Dayshmookh <notifications@ofajassistant.com>',
			subject: `Checkup of ${machine.name} due on ${machine.checkup.next}`,
			html: '<p>Contact OFAJ ASAP.<p>'
		}

		emails.push(email)
	})

	console.log('Sending...', emails)

	sgMail
		.sendMultiple(emails)
		.then(result => {
			//Celebrate
			console.log('Sent mails.')
			console.log('Sending messages...')

			todayMachines.forEach(machine => {
				let mobileNo = machine.incharge.phone.split(';')
				// let mobileNo = ['+918208396310','+917767060939','+919011792002', '+919021735821']
				
				let message = `Email sent to supplier of ${machine.name}`

				msg91.send(mobileNo, message, function(err, response) {
					if (err) console.log(err)
					console.log('Sent message.')
				})
			})
		})
		.catch(error => {
			//Log friendly error
			console.error(error.toString())

			//Extract error msg
			// const { message, code, response } = error

			//Extract response msg
			// const { headers, body } = response
		})

	mongoose.disconnect()
})

// create array of objects as shonwn below

/* 
let msg = {
	to: ['zire_mrunalsingh.ghrcecs@raisoni.net'],
	from: 'notifications@rootkings.com',
	subject: 'Fix maintenence manager email and sms notifications.',
	html: '<h1>Jab tak nai kroge, tab tak ye program pareshan krega.</h1>'
}

sgMail
	.sendMultiple(msg)
	.then(result => {
		//Celebrate
		console.log('Sent mails.')
	})
	.catch(error => {
		//Log friendly error
		console.error(error.toString())

		//Extract error msg
		// const { message, code, response } = error

		//Extract response msg
		// const { headers, body } = response
	})

let mobileNo = ['+918208396310']
let message = 'Fix maintenence manager email and sms notifications.'
msg91.send(mobileNo, message, function(err, response) {
	if (err) console.log(err)
	console.log('Sent messages.')
})
 */
