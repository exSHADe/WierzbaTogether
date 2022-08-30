const userService = require('../services/users.services');

async function authenticate(req, res, next) {
    await userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
async function register(req, res, next) {
    await userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
async function getAll(req, res, next) {
    await userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
async function getCurrent(req, res, next) {
    await userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
async function getById(req, res, next) {
    await userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
async function update(req, res, next) {
    await userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}
async function _delete(req, res, next) {
    await userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
//exports modules
module.exports = {
    authenticate,
    register,
    getAll,
    getCurrent,
    getById,
    update,
    delete: _delete
};