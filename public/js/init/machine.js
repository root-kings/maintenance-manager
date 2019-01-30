var machineview;

$(function () {
    populate(localStorage.getItem('machineId'));
})

function populate(id) {
    $.get('/api/machine/' + id, function (machine) {
        machine.checkup.history.sort().reverse();

        // machine.checkup.last = moment(this.checkup.history.sort()[0]).format("DD MMM YYYY");

        machineview = new Vue({
            el: '#machine',
            data: {
                machine: machine
            },
            mounted: function () {
                M.Datepicker.init(document.getElementById('date'), {
                    defaultDate: new Date(),
                    setDefaultDate: true,
                    format: "yyyy-mm-dd"
                });
                M.updateTextFields();

            }
        })

    })
}

function addRecord(id) {
    var record = {
        id: id,
        date: $("#date").val()
    }

    console.log(record);

    $.post('/api/machine/record/add', record, function (result) {
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