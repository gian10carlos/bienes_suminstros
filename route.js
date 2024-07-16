const express = require('express')

const router = express.Router();
const controller = require('./controllers/controller')
const req_controller = require('./controllers/request_controller')
const ord_controller = require('./controllers/order_controller')

router.get('/', controller.viewLogin)
router.get('/request', req_controller.viewRequest)
router.get('/request/validate/boss', req_controller.viewCheckBossRequest)
router.get('/request/validate/manager', req_controller.viewCheckManagerRequest)
router.get('/order/create/logistic', ord_controller.viewCheckLogistic)
router.get('/order/validate/manager', ord_controller.viewCheckManager)
router.get('/order/final/warehouse', controller.viewWarehouseOrd)
router.get('/request/final/warehouse', controller.viewWarehouseReq)

router.post('/login-access', controller.checkUser);

router.post('/request/post/data', req_controller.saveRequest);
router.post('/request/update/boss', req_controller.updatedCheckBossRequest);
router.post('/request/update/manager', req_controller.updateCheckManagerOrder);
router.post('/order/buy/create/logistics', ord_controller.saveOrderBuy);
router.post('/order/update/manager', ord_controller.updateCheckManagerOrder);
router.post('/request/update/final/warehouse', controller.updatedFinalReq);
router.post('/order/update/final/warehouse', controller.updatedFinalOrd);

module.exports = router; 