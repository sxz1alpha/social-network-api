const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Use a valid email address.']
        },
        thoughts: [{
            type: Schema.Type.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Type.ObjectId,
            ref: 'friends'
        }]
    },
    {
        toJSON: {
            vituals: true,
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;