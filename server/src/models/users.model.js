const moongose = require('mongoose');

const UsersSchema = moongose.Schema({
    firstName   :    { type: String,    required: true },
    lastName    :    { type: String,    required: true },
    userName    :    { type: String,    required: true  ,  unique:true },
    userMail    :    { type: String,    required: true  ,  unique:true },
    hash        :    { type: String,    required: true }, //password
    accountType :    { type: Number,    default : 0}    ,
    groups : [{type:String, lowercase:true}],
    isSuspended : {type:String, default:false} //isBanned? === true then BANHAMMER HAS SPOKEN
}, {
    timestamps: true
});
UsersSchema.set('toJSON', 
{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) 
    {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = moongose.model('users', UsersSchema);
