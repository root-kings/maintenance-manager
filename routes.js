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

router.get('/users', (req, res) => {
	res.render('users')
})

router.get('/about', (req, res) => {
	res.render('about')
})

router.get('/login', (req, res) => {
	res.render('login')
})
router.get('/register', (req, res) => {
	res.render('register')
})

// Machine -----

var machineController = require('./controllers/machineController')

router.get('/api/machines', machineController.machines_get)

router.get('/api/machine/:id', machineController.machine_detail_get)

router.get('/api/machines/deleteall', machineController.machines_delete_all_get)

router.post('/api/machine/create', machineController.machine_create_post)

router.post('/api/machine/record/add', machineController.machine_record_add_post)

router.post('/api/machine/record/remove', machineController.machine_record_remove_post)

router.post('/api/machine/:id/delete', machineController.machine_delete_post)

router.post('/api/machine/:id/remark', machineController.machine_remark_post)

router.post('/api/machine/:id/edit', machineController.machine_update_post)

//router.get('/machine/:id', machineController.machine_detail_view_get)

// Spare -----

var spareController = require('./controllers/spareController')

router.get('/api/spares', spareController.spares_get)

router.get('/api/spare/:id', spareController.spare_detail_get)

router.get('/api/spares/deleteall', spareController.spares_delete_all_get)

router.post('/api/spare/create', spareController.spare_create_post)

router.post('/api/spare/:id/delete', spareController.spare_delete_post)

router.post('/api/spare/:id/edit', spareController.spare_update_post)

router.post('/api/spare/:id/stage', spareController.spare_stage_update_post)

router.post('/api/spare/:id/stage/done', spareController.spare_stage_done_update_post)


// User -----

var userController = require('./controllers/userController')

router.get('/api/users', userController.users_get)

router.get('/api/user/:id', userController.user_detail_get)

router.get('/api/users/deleteall', userController.users_delete_all_get)

router.post('/api/user/create', userController.user_create_post)

router.post('/api/user/:id/delete', userController.user_delete_post)

router.post('/api/user/:id/edit', userController.user_update_post)

router.post('/api/user/:id/activate', userController.user_activate_post)

router.post('/api/user/login', userController.user_login_post)

// Testing -----

router.get('/calibration/dark', (req, res) => {
	res.render('calibration-dark')
})

module.exports = router
