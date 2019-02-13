var spareview, 
    stageEditView,
    stageEditViewModal;


document.addEventListener('DOMContentLoaded', function() {
    fetch('/spares/list').then(function(response){
        return response.json();
    }).then(function (listspares) {

        spareview = new Vue({
            el: '#spares',
            data: {
                spares: listspares
            },
            mounted: function () {
                M.Collapsible.init(document.querySelectorAll('.collapsible'), {
                    accordion: false
                });
                M.Modal.init(document.querySelectorAll('.modal'));
            }
        })

    })


});


function spareEdit(id) {
    localStorage.setItem('spareId', id);
    window.location.href = '/spare';
}

function spareDelete(id) {
    if (confirm("Delete this spare?")) {
        fetch('/api/spare/' + id + '/delete',{
            method: "POST", 
            mode: "cors", 
            
        }).then(function(response){
            return response.json();
        }).then(function(result){
            if (result) {
                window.location.reload();
            }
        });
        /* $.post('/api/spare/' + id + '/delete', function (result) {
            window.location = '/spares';
        }); */
    }
}

function spareStageUpdate(id,stage){
    // $.post('/api/spare/' + id + '/stage',{stage: stage}, function (result) {
    //     window.location = '/spares';
    // });
    spareEditTimerModal(id);
}

function spareEditTimerModal(id){
    
    
    
    fetch('/api/spare/'+id).then(function(response){
        return response.json();
    }).then(function (spare) {

        spare.requisition.date = moment(spare.requisition.date).format('YYYY-MM-DD');
        spare.vetting.date = moment(spare.vetting.date).format('YYYY-MM-DD');
        spare.tod.date = moment(spare.tod.date).format('YYYY-MM-DD');
        spare.tsc.date = moment(spare.tsc.date).format('YYYY-MM-DD');
        spare.so.date = moment(spare.so.date).format('YYYY-MM-DD');

        stageEditView = new Vue({
            el: '#sparestagemodal',
            data: {
                spare: spare
            },
            mounted: function () {
                stageEditViewModal = M.Modal.init(document.getElementById('sparestagemodal'))

                stageEditViewModal.open();
                
                M.Datepicker.init(document.querySelectorAll('.datepicker'), {
                    defaultDate: new Date(),
                    setDefaultDate: true,
                    format: "yyyy-mm-dd"
                });

                M.updateTextFields();
            }
        })

    })
}

function spareEditTimer(id){}