const dbConfig = require('../../config/dbConfig');
const Post = require('../../config/dbSetup').Post;
const userService = require('../../src/services/users.services')
const webSocket = require('../../config/webSocket');

async function create(props){
    if(!props.content) throw 'Please prompt your thread'
    const post = new Post(props);
    webSocket().update()
    await post.save();   
}
async function getAll(userID,page){
    const pageLimit = 10
    let user = await userService.getById(userID)
    let posts= await Post.find(user.accountType === 0 ? {tag:user.groups}:{}).sort({_id:-1}).skip(page*pageLimit).limit(pageLimit);
    let next = await Post.count() > (parseInt(page)+1)*pageLimit
    //if(user.accountType === 0) posts = posts.filter(x=>user.groups.includes(x.tag))
    return {posts,next:next};
}
async function getById(id){
    return await Post.findById(id);
}
async function edit(id,props){
    const post = await Post.findById(id);
    if(!post) throw 'Post not found.';
    Object.assign(post,props);
    webSocket().update()
    await post.save();
}
async function _delete(id){
    await Post.findByIdAndRemove(id);
    webSocket().update()
}
async function calc(id)
{
    const post = await Post.findById(id);
    if(!post) throw 'Post not found';
    let counter = 0;
    await post.reacts.filter(x => x.vote ? counter++ : counter--);
    post.reactCounter = counter;
    await post.save();
}
async function set(id,props) 
{
    const post = await Post.findById(id);
    if(!post) throw 'Post not found';
    let reactChange =await post.reacts.find(x=>x.userID === props.userID);
    if(!reactChange) post.reacts.push(props);
    else
    {
        if(reactChange.vote === props.vote) post.reacts.pop(props.userID);
        else reactChange.vote = props.vote;
    }
    let counter = 0;
    await post.reacts.filter(x => x.vote ? counter++ : counter--);
    post.reactCounter = counter;
    webSocket().update()
    return await post.save();
}
async function getReacts(id)
{
    const post = await Post.findById(id);
    if(!post) throw 'Post not found';
    if(!post.reacts) throw 'Reacts not found';
    return post.reacts;
}
async function getCurrent(id,userID)
{
    const post = await Post.findById(id);
    if(!post) throw 'Post not found';
    let react = post.reacts.find(x=>x.userID == userID);
    if(!react) throw 'React not found.';
    return react;
}

module.exports = {
    create,
    getAll,
    getById,
    edit,
    delete: _delete,
    calc,
    set,
    getReacts,
    getCurrent
}