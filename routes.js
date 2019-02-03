/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
var router = require('express').Router()

router.get('/', (req, res) => {
    // res.send('Hello world!')
    res.redirect('/calibration')
    // res.render('index')
})

router.get('/calibration', (req, res) => {
    res.render('calibration')
})

router.get('/machine', (req, res) => {
    res.render('machine')
})

router.get('/spares', (req, res) => {
    res.render('spares')
})

router.get('/spare', (req, res) => {
    res.render('spare')
})

router.get('/about', (req, res) => {
    res.render('about')
})


// Machine -----

var machineController = require('./controllers/machineController')

router.get('/api/machines', machineController.machines_get)

router.get('/machines/list', machineController.machines_list_get)

router.get('/api/machine/:id', machineController.machine_detail_get)

router.get('/api/machines/deleteall', machineController.machines_delete_all_get)


router.post('/machine/create', machineController.machine_create_post)

router.post('/api/machine/record/add', machineController.machine_record_add_post)

router.post('/api/machine/:id/delete', machineController.machine_delete_post)


//router.get('/machine/:id', machineController.machine_detail_view_get)

// Spare -----

var spareController = require('./controllers/spareController')

router.get('/api/spares', spareController.spares_get)

router.get('/spares/list', spareController.spares_list_get)

router.get('/api/spare/:id', spareController.spare_detail_get)

router.get('/api/spares/deleteall', spareController.spares_delete_all_get)


router.post('/spare/create', spareController.spare_create_post)

router.post('/api/spare/:id/delete', spareController.spare_delete_post)





module.exports = router