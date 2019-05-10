var spareview, stageEditView, stageEditViewModal, sparestageModal, sparestageEditModal

document.addEventListener('DOMContentLoaded', function() {
	sparestageEditModal = M.Modal.init(document.getElementById('sparestageeditmodal'))

	showWait()
	// fetch(hostaddress + '/api/spares')
	// 	.then(function(response) {
	// 		return response.json()
	// 	})
	// 	.then(function(listspares) {
	// 		// listspares.forEach(spare => {
	// 		// 	// if (spare.stages) spare.stages.forEach(stage => (stage.dateexpected = moment(stage.dateexpected).format('YYYY-MM-DD')))
	// 		// })

			spareview = new Vue({
				el: '#spares',
				data: {
					spares: [],
					newstage: {
						name: '',
						dateexpected: '',
						timeout: '',
						datedone: '',
						notes: ''
					},
					selectedSpare: {
						stages: []
					},
					selectedStage: -1
				},
				mounted: function() {
					updateView()
					M.Collapsible.init(document.querySelectorAll('.collapsible'), {
						accordion: false
					})
					// M.Modal.init(document.querySelectorAll('.modal'))
					// M.Datepicker.init(
					// 	document.querySelectorAll('.datepicker'),
					// 	{
					// 		defaultDate: new Date(),
					// 		setDefaultDate: true,
					// 		format: 'yyyy-mm-dd'
					// 	}
					// )
					M.updateTextFields()
					hideWait()
				},
				methods: {
					addStage: function(spareindex, stageindex = -1) {
						// console.log(spareindex)

						this.selectedSpare.stages.push(this.newstage)

						spareStageUpdate(this.selectedSpare._id, this.selectedSpare.stages)
						this.newstage = {
							name: '',
							dateexpected: '',
							timeout: '',
							datedone: '',
							notes: ''
						}
						// M.updateTextFields()
					},
					addStageModal: function(spareindex) {
						sparestageEditModal.open()
					}
				}
			})
			// console.log('hello')
		// })
})

function spareEdit(id) {
	localStorage.setItem('spareId', id)
	window.location.href = location.hostname == '' ? 'file:///android_asset/www/spare.html' : '/spare'
}

function spareDelete(id) {
	if (confirm('Delete this spare?')) {
		showWait()
		fetch(hostaddress + '/api/spare/' + id + '/delete', {
			method: 'POST',
			mode: 'cors'
		})
			.then(function(response) {
				return response.json()
			})
			.then(function(result) {
				if (result) {
					M.toast({ html: 'Spare deleted!' })
					updateView()
				}
				hideWait()
			})
		/* $.post('/api/spare/' + id + '/delete', function (result) {
            window.location = '/spares';
        }); */
	}
}

function spareStageUpdate(id, stages) {
	showWait()
	console.log('Seleceted ID:', spareview.selectedSpare._id)
	console.log('ID:', id)
	console.log('Stages:', stages)
	fetch(hostaddress + '/api/spare/' + id + '/stage', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ stages: stages })
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				updateView()
				M.toast({ html: 'Updated!' })
			}
			hideWait()
		})
	/* $.post('/api/spare/' + id + '/stage',updateObject, function (result) {
	    window.location = '/spares';
	}); */
}

function spareEditTimerModal(id, index) {
	stageEditViewModal = M.Modal.init(document.getElementById('sparestagemodal'))

	spareview.selectedSpare = spareview.spares[index]

	console.log(spareview.selectedSpare)
	stageEditViewModal.open()

	M.updateTextFields()
}

function spareEditTimer(id) {
	showWait()
	var newtimerform = new FormData(document.getElementById('sparestagemodalform' + id))
	var newtimerdata = {}
	newtimerform.forEach(function(value, key) {
		newtimerdata[key] = value
	})

	var newtimer = {}

	console.log(newtimer)

	fetch(hostaddress + '/api/spare/' + id + '/stage/timer', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newtimer)
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				// updateView()
				M.toast({ html: 'Timer updated!' })
			}
			hideWait()
		})
}

function updateView() {
	showWait()
	fetch(hostaddress + '/api/spares')
		.then(function(response) {
			return response.json()
		})
		.then(function(listspares) {
			listspares.forEach(spare => {

				spare.stages[0].dateexpected = spare.stages[0].datedone
				for (i = 1; i < spare.stages.length; i++) {
					spare.stages[i].dateexpected = moment(spare.stages[i-1].datedone).add(spare.stages[i].timeout,'days')
				}

				// 	spare.newstage = {
				// 		dateexpected: '',
				// 		timeout: '',
				// 		datedone: ''
				// 	}
			})

			spareview.spares = listspares
			hideWait()
		})
}

function createSpare() {
	showWait()
	var createform = document.getElementById('createspareform')
	var formData = new FormData(createform)

	var formobject = {}
	formData.forEach(function(value, key) {
		formobject[key] = value
	})

	fetch(hostaddress + '/api/spare/create', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		headers: {
			'Content-Type': 'application/json'
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		body: JSON.stringify(formobject) // body data type must match "Content-Type" header
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				M.toast({ html: 'Spare created!' })
				updateView()
				createform.reset()
			}
			hideWait()
		})
}
