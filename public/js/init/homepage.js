var upcomingview;

$(document).ready(function () {

    $.get('/machines/list', function (listmachines) {
        
        upcomingview = new Vue({
            el: '#upcoming',
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