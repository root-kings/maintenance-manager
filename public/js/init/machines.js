var machineview;

$(document).ready(function () {
    $('.modal').modal();

    $.get('/machines/list', function (listmachines) {
        
        machineview = new Vue({
            el: '#machines',
            data: {
                machines: listmachines
            }
        })

    })

});

function viewMachine(id) {
    localStorage.setItem('machineId', id);
    window.location.href = '/machine';
}