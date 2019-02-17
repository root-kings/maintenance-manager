const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
	to: [ 'joshi_tushar.ghrcecs@raisoni.net', 'zire_mrunalsingh.ghrcecs@raisoni.net'],
	from: 'zire@chutya.com',
	subject: 'Zire Gandu hi rhega saala zindagi bhar',
	html: '<h1>Subject Dekh le Bhosdike</h1>'
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
