const sgMail = require('@sendgrid/mail')
const msg91 = require('msg91')('247111AI4S9E1P5bea6b3a', 'krushn', '4')

// get list of all messgaes

// filter messages for today

// create array of objects as shonwn below

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
let msg = {
	to: [ 'zire_mrunalsingh.ghrcecs@raisoni.net'],
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

let mobileNo = [  '+918208396310']
let message = 'Fix maintenence manager email and sms notifications.'
msg91.send(mobileNo, message, function(err, response) {
	if (err) console.log(err)
	console.log('Sent messages.')
})
