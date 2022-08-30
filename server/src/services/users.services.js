const dbConfig = require('../../config/dbConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../config/dbSetup').User;

async function authenticate({ login, password }) {
    let user = await User.findOne({ userName: login });
    if (!user) user = await User.findOne({userMail:login});
    if (user && user.isSuspended == "true") throw "Account Banned"
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, dbConfig.secret, { expiresIn: '14d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}
async function getAll() {
    return await User.find();
}
async function getById(id) {
    return await User.findById(id);
}
async function create(props) {
    // validate
    if (await User.findOne({ userName: props.userName })) 
        throw 'Username "' + props.userName + '" is already taken'
    if (await User.findOne({ userMail: props.userMail })) 
        throw 'Usermail "' + props.userMail + '" is already taken'
    
    const user = new User(props);

    // hash password
    if (props.password) {
        user.hash = bcrypt.hashSync(props.password, 10);
    }
    user.groups.push("anyone");
    if(props.group !="") user.groups.push(props.group)
    // save user
    await user.save()
}
async function update(id, props) {
    const user = await User.findById(id);

    // validate data 
    if (!user) throw 'User not found';
    if (user.userName !== props.userName && await User.findOne({ userName: props.userName })) 
        throw 'Username "' + props.userName + '" is already taken';
    if (user.userMail !== props.userMail && await User.findOne({ userMail: props.userMail })) 
        throw 'userMail "' + props.userMail + '" is already taken';
    

    // hash password if it was entered
    if (props.password) {
        props.hash = bcrypt.hashSync(props.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, props);

    await user.save();

  //  if(user.isSuspended === true) throw new Error

    const token = jwt.sign({ sub: user.id }, dbConfig.secret, { expiresIn: '14d' });
    return {
        ...user.toJSON(),
        token
    };
}
async function _delete(id) {
    await User.findByIdAndRemove(id);
}

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};