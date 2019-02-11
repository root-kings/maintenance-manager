var spareview;

$(function () {
    populate(localStorage.getItem('spareId'));
})

function populate(id) {
    $.get('/api/spare/' + id, function (spare) {
        
        spareview = new Vue({
            el: '#spare',
            data: {
                spare: spare
            },
            mounted: function () { 
                M.updateTextFields();
            }
        })

    })
}
