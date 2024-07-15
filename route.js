const express = require('express')

const router = express.Router();
const controller = require('./controllers/controller')
const req_controller = require('./controllers/request_controller')

router.get('/', controller.viewLogin)
router.get('/request', req_controller.viewRequest)
router.get('/request/validate/boss', req_controller.viewCheckBossRequest)
router.get('/request/validate/manager', req_controller.viewCheckManagerRequest)

router.post('/login-access', controller.checkUser);

router.post('/request/post/data', req_controller.saveRequest);
router.post('/request/update/boss', req_controller.updatedCheckBossRequest);

module.exports = router; 