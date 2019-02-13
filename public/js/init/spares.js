var spareview, stageEditView, stageEditViewModal

document.addEventListener('DOMContentLoaded', function() {
	fetch('/api/spares')
		.then(function(response) {
			return response.json()
		})
		.then(function(listspares) {
			listspares.forEach(spare => {
				spare.requisition.date = moment(spare.requisition.date).format(
					'YYYY-MM-DD'
				)
				spare.vetting.date = moment(spare.vetting.date).format(
					'YYYY-MM-DD'
				)
				spare.tod.date = moment(spare.tod.date).format('YYYY-MM-DD')
				spare.tsc.date = moment(spare.tsc.date).format('YYYY-MM-DD')
				spare.so.date = moment(spare.so.date).format('YYYY-MM-DD')
			})

			spareview = new Vue({
				el: '#spares',
				data: {
					spares: listspares
				},
				mounted: function() {
					M.Collapsible.init(
						document.querySelectorAll('.collapsible'),
						{
							accordion: false
						}
					)
					M.Modal.init(document.querySelectorAll('.modal'))
				}
			})
		})
})

function spareEdit(id) {
	localStorage.setItem('spareId', id)
	window.location.href = '/spare'
}

function spareDelete(id) {
	if (confirm('Delete this spare?')) {
		fetch('/api/spare/' + id + '/delete', {
			method: 'POST',
			mode: 'cors'
		})
			.then(function(response) {
				return response.json()
			})
			.then(function(result) {
				if (result) {
					window.location.reload()
				}
			})
		/* $.post('/api/spare/' + id + '/delete', function (result) {
            window.location = '/spares';
        }); */
	}
}

function spareStageUpdate(id, stage) {
	
	fetch('/api/spare/' + id + '/stage', {
		method: 'POST', 
		mode: 'cors', 
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ stage: stage }) 
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				updateView();
				M.toast({ html: 'Updated!' })
			}
		})
	/* $.post('/api/spare/' + id + '/stage',updateObject, function (result) {
	    window.location = '/spares';
	}); */
}

function spareEditTimerModal(id) {
	stageEditViewModal = M.Modal.init(
		document.getElementById('sparestagemodal' + id)
	)

	stageEditViewModal.open()

	M.updateTextFields()
}

function spareEditTimer(id) {}

function updateView () {
	fetch('/api/spares')
		.then(function(response) {
			return response.json()
		})
		.then(function(listspares) {
			listspares.forEach(spare => {
				spare.requisition.date = moment(spare.requisition.date).format(
					'YYYY-MM-DD'
				)
				spare.vetting.date = moment(spare.vetting.date).format(
					'YYYY-MM-DD'
				)
				spare.tod.date = moment(spare.tod.date).format('YYYY-MM-DD')
				spare.tsc.date = moment(spare.tsc.date).format('YYYY-MM-DD')
				spare.so.date = moment(spare.so.date).format('YYYY-MM-DD')
			})

			spareview.spares= listspares
				
		})
}