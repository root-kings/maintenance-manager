$(document).ready(function () {
    var tabinstances = M.Tabs.init(document.getElementsByClassName('tabs'));
    // var machinemodalinstance = M.Modal.init(document.getElementById('machine-modal'));

    $('.modal').modal();

    $.get('/machines/list', function(listmachines){
        var machineview = new Vue({
            el: '#machines',
            data: {
                machines: listmachines
            }
        })
    })
    
});