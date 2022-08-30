const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controllers');

//Post actions route
router.post('/authenticate',userController.authenticate);
router.post('/register',userController.register);
//Get actions route
router.get('/',userController.getAll);
router.get('/current',userController.getCurrent);
router.get('/:id',userController.getById);
//Put actions route
router.put('/:id',userController.update);
//Delete actions route
router.delete('/:id',userController.delete);
//export
module.exports = router
