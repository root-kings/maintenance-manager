var upcomingview;

$(document).ready(function () {

    $.get('/machines/list', function (listmachines) {
        listmachines.map(function (machine) {
            machine.soondays = moment(machine.checkup.next).diff(moment(), "days");
            machine.soon = (machine.soondays <= 10) ? true : false;
        });

        listmachines.sort(function(m1,m2){
            if (m1.soondays > m2.soondays) return 1;
            if (m1.soondays < m2.soondays) return -1;
            return 0;
        });

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