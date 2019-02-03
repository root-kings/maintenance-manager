var spareview;

$(document).ready(function () {
    $('.modal').modal();

    $.get('/spares/list', function (listspares) {
        
        spareview = new Vue({
            el: '#spares',
            data: {
                spares: listspares
            }
        })

    })

});


function viewSpare(id) {
    localStorage.setItem('spareId', id);
    window.location.href = '/spare';
}