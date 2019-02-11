var upcomingview;

$(document).ready(function () {

    $.get('/machines/list', function (listmachines) {
        listmachines.map(function (machine) {
            machine.soondays = moment(machine.checkup.next).diff(moment(), "days");
            machine.soon = (machine.soondays <= 10) ? true : false;
        });

        listmachines.sort(function (m1, m2) {
            if (m1.soondays > m2.soondays) return 1;
            if (m1.soondays < m2.soondays) return -1;
            return 0;
        });

        upcomingview = new Vue({
            el: '#upcoming',
            data: {
                machines: listmachines
            },

            mounted: function () {
                M.Collapsible.init(document.querySelectorAll('.collapsible'), {
                    accordion: false
                });
                M.FormSelect.init(document.querySelectorAll('select'));
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

function machineEdit(id) {
    localStorage.setItem('machineId', id);
    window.location.href = '/machine';
}

function addRecord(id) {
    var record = {
        id: id,
        date: $("#date" + id).val(),
        //remark: $("#remark" + id).val()
    }

    console.log(record);

    $.post('/api/machine/record/add', record, function (result) {
        if (result) {
            window.location.reload();
        }
    })

}

function removeRecord(id, val) {
    var record = {
        id: id,
        date: val
    }

    console.log(record);

    $.post('/api/machine/record/remove', record, function (result) {
        if (result) {
            window.location.reload();
        }
    })

}

function machineDelete(id) {
    if (confirm("Delete this machine?")) {
        $.post('/api/machine/' + id + '/delete', function (result) {
            window.location = '/machines';
        });
    }
}
function saveRemark(event, id){
    $.post('/api/machine/' + id + '/remark', {remark:event.target.value}, function (result) {
        // window.location = '/machines';
        M.toast({html:'Remark updated!'});
    });
    //console.log(id,event.target.value);
}