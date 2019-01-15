/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
var router = require('express').Router()

router.get('/', (req, res) => {
    // res.send('Hello world!')
    res.render('index')
})


// Machine -----

var machineController = require('./controllers/machineController')

router.get('/machines', machineController.machines_get)

router.get('/machines/list', machineController.machines_list_get)

router.get('/machine/:id', machineController.machine_detail_get)

router.post('/machine/create', machineController.machine_create_post)

module.exports = router