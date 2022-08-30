const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts.controllers');

router.post('/add',postController.addPost);
router.get('/all::userID/:page',postController.getAll);
router.get('/:id',postController.getById);
router.put('/edit::id',postController.edit);
router.delete('/:id',postController.delete);

router.put('/calc::id',postController.calc);
router.put('/:id/set',postController.setReact);
router.get('/:id/reacts',postController.getReacts);
router.get('/:id/react::userID',postController.getCurrent);

//export
module.exports = router