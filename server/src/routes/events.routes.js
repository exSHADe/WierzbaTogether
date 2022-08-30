const express = require('express')
const router = express.Router()
const eventController = require('../controllers/events.controllers');

router.post('/create',eventController.createEvent);
router.get('/',eventController.getAll);
router.get('/:id',eventController.getById);
router.put('/:id',eventController.changeDetails);
router.delete('/:id',eventController.delete);

router.put('/count::id',eventController.count);
router.post('/:id/join',eventController.joinEvent);
router.get('/:id/anyStatus',eventController.anyStatus);
router.get('/:id/status::memberID',eventController.status);


//export
module.exports = router