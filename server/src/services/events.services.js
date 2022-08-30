const Event = require('../../config/dbSetup').Event;

async function create(props){
    if(!props.title) throw 'Please set your title'
    if(!props.content) throw 'Please describe your event'
    if(!props.eventDate) throw 'Fill event data'
    //if(!props.place) throw 'Set event placement'
    const event = new Event(props);
    await event.save(); 
}
async function getAll(){
    return await Event.find();
}
async function getById(id){
    return await Event.findById(id);
}
async function change(id,props){
    const event = await Event.findById(id);
    if(!event) throw 'Event not found';
    if(!props.title) throw 'Please set your title'
    if(!props.content) throw 'Please describe your event'
    if(!props.eventDate) throw 'Fill event data'
    //if(!props.place) throw 'Set event placement'
    Object.assign(event,props);
    await event.save();
}
async function _delete(id){
    await Event.findByIdAndRemove(id);
}

async function count(id){
    const event = await Event.findById(id);
    if(!event) throw 'Event not found';
    let pCounter = 0;
    let iCounter = 0;
    await event.members.filter(x=>{
        if(x.state == "active") pCounter++;
        if(x.state == "onhold") iCounter++;
    })
    event.participants = pCounter;
    event.interestants = iCounter;
    await event.save();
}
async function join(id,props){
    const event = await Event.findById(id);
    if(!event) throw 'Event not found';
    let member =await event.members.find(x=>x.memberID === props.memberID);
    if(!member) event.members.push(props);
    else throw 'You already joined.'
    await event.save()
}
async function anyStatus(id){
    const event = await Event.findById(id);
    if(!event) throw 'Event not found';
    if(!event.members) throw 'No one curently joined';
    return event.members;
}
async function status(id,memberID){
    const event = await Event.findById(id);
    if(!event) throw 'Event not found';
    let member = event.members.find(x=>x.memberID == memberID);
    if(!member) throw `You didn't joined to this event`;
    return member;
}

module.exports = {
    create,
    getAll,
    getById,
    change,
    delete: _delete,
    count,
    join,
    anyStatus,
    status
}