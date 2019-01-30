/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
var router = require('express').Router()

router.get('/', (req, res) => {
    // res.send('Hello world!')
    res.render('index')
})

router.get('/machines', (req, res) => {
    // res.send('Hello world!')
    res.render('machines')
})

router.get('/machine', (req, res) => {
    // res.send('Hello world!')
    res.render('machine')
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






module.exports = router