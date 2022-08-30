const eventService = require('../services/events.services');

async function createEvent(req, res, next){
    await eventService.create(req.body)
    .then(() => res.json())
    .catch(err => next(err));
}
async function getAll(req, res, next){
    await eventService.getAll()
    .then(events=> res.json(events))
    .catch(err => next(err));
}
async function getById(req, res, next){
    await eventService.getById(req.params.id)
    .then(event => event ? res.json(event) : res.sendStatus(404))
    .catch(err => next(err));
}
async function changeDetails(req, res, next){
    await eventService.change(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
async function _delete(req, res, next){
    await eventService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

async function count(req, res, next){
    await eventService.count(req.params.id)
    .then(() => res.json())
    .catch(err => next(err));
}
async function joinEvent(req, res, next){
    await eventService.join(req.params.id,req.body)
    .then(() => res.json())
    .catch(err => next(err));
}
async function anyStatus(req,res,next){
    await eventService.anyStatus(req.params.id)
    .then(members => res.json(members))
    .catch(err => next(err))
}
async function status(req,res,next){
    await eventService.status(req.params.id,req.params.memberID)
    .then(react => res.json(react))
    .catch(err => next(err))
}


module.exports = {
    createEvent,
    getAll,
    getById,
    changeDetails,
    delete: _delete,
    count,
    joinEvent,
    anyStatus,
    status
}