const moongose = require('mongoose');

const EventsSchema = moongose.Schema({
    firstName   :    { type: String,    required: true, ref:"users" },
    lastName    :    { type: String,    required: true, ref:"users" },
    authorID    :    { type: String,    required: true, ref:"users" },
    title       :    { type: String,    required: true },
    content     :    { type: String,    required: true },
    eventDate   :    { type: Date  ,    required: true },
    //place       :    { ???}
    participants:    { type: Number,    default : 0    },
    interestants:    { type: Number,    default : 0    },
    members  : [{
        memberID    :    { type: String,    required: true, ref:"users" },
        firstName   :    { type: String,    required: true, ref:"users" },
        lastName    :    { type: String,    required: true, ref:"users" },
        state       :    { type: String,    required: true, default:"unknown"}  //active,onhold,opposed,unknown - default
    }]
}, {
    timestamps: true
});
EventsSchema.set('toJSON', 
{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) 
    {
        delete ret._id;
    }
});

module.exports = moongose.model('events', EventsSchema);