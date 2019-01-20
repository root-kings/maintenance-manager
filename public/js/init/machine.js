var machineview;

$(function () {
    M.Datepicker.init(document.getElementById('date'), {
        defaultDate: new Date(),
        setDefaultDate: true
    });

    M.updateTextFields();

    populate(localStorage.getItem('machineId'));
})

function populate(id) {
    $.get('/api/machine/' + id, function (machine) {
        machineview = new Vue({
            el: '#machine',
            data: {
                machine: machine
            }
        })

    })
}

function mark(id) {
    console.log(id);
}