const postService = require('../services/posts.services')

async function addPost(req, res, next){
    await postService.create(req.body)
    .then(() => res.json())
    .catch(err => next(err));
}
async function getAll(req, res, next){
    await postService.getAll(req.params.userID,req.params.page)
    .then(posts=> res.json(posts))
    .catch(err => next(err));
}
async function getById(req, res, next){
    await postService.getById(req.params.id)
    .then(post => post ? res.json(post) : res.sendStatus(404))
    .catch(err => next(err));
}
async function edit(req, res, next){
    await postService.edit(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
async function _delete(req, res, next){
    await postService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

async function calc(req, res, next){
    await postService.calc(req.params.id)
    .then(() => res.json())
    .catch(err => next(err));
}
async function setReact(req, res, next){
    await postService.set(req.params.id,req.body)
    .then((post) => res.json(post))
    .catch(err => next(err));
}
async function getReacts(req,res,next){
    await postService.getReacts(req.params.id)
    .then(reacts => res.json(reacts))
    .catch(err => next(err))
}
async function getCurrent(req,res,next){
    await postService.getCurrent(req.params.id,req.params.userID)
    .then(react => res.json(react))
    .catch(err => next(err))
}


module.exports = {
    addPost,
    getAll,
    getById,
    edit,
    delete: _delete,
    calc,
    setReact,
    getReacts,
    getCurrent
}