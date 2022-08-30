const moongose = require('mongoose');

const PostsSchema = moongose.Schema({
    firstName   :    { type: String,    required: true, ref:"users" },
    lastName    :    { type: String,    required: true, ref:"users" },
    authorID    :    { type: String,    required: true, ref:"users" },
    title       :    { type: String,    },
    content     :    { type: String,    required: true },
    reactCounter:    { type: Number,    default : 0    },
    tag: {type:String, lowercase:true ,required:true},
    reacts : [{
        userID : {type:String, required:true , ref:"users"},
        vote   : {type:Boolean, required:true}
    }]
}, {
    timestamps: true
});
PostsSchema.set('toJSON', 
{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) 
    {
        delete ret._id;
    }
});

module.exports = moongose.model('posts', PostsSchema);