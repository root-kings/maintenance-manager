var upcomingview;

$(document).ready(function () {
    $('.modal').modal();

    $.get('/machines/list', function (listmachines) {
        
        upcomingview = new Vue({
            el: '#upcoming',
            data: {
                machines: listmachines
            }
        })

    })

});

function mark(id) {
    console.log(id);
}

function viewMachine(id) {
    localStorage.setItem('machineId', id);
    window.location.href = '/machine';
}