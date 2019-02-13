var spareview, stageEditView;

$(document).ready(function () {
    
    $.get('/spares/list', function (listspares) {

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
                // M.Datepicker.init(document.querySelectorAll('.datepicker'), {
                //     defaultDate: new Date(),
                //     setDefaultDate: true,
                //     format: "yyyy-mm-dd"
                // });
                // M.updateTextFields();
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
        $.post('/api/spare/' + id + '/delete', function (result) {
            window.location = '/spares';
        });
    }
}

function spareStageUpdate(id,stage){
    $.post('/api/spare/' + id + '/stage',{stage: stage}, function (result) {
        window.location = '/spares';
    });
}

function spareEditTimerModal(id){
    
    // var instances = M.Modal.init(document.getElementById('sparestagemodal'));
    
    
    $.get('/spare/'+id, function (spare) {
    
        stageEditView = new Vue({
            el: '#sparestagemodal',
            data: {
                spare: spare
            },
            mounted: function () {
                // instances.open();
                
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