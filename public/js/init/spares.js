var spareview;

$(document).ready(function () {
    $('.modal').modal();

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
                M.Datepicker.init(document.querySelectorAll('.datepicker'), {
                    defaultDate: new Date(),
                    setDefaultDate: true,
                    format: "yyyy-mm-dd"
                });
                M.updateTextFields();
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

function spareEditTimerModal(id){}

function spareEditTimer(id){}