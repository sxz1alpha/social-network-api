const { Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema ({
        thoughtText: {
            type: String, 
            required: true,
            max: 280     
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => formatDate(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJson: {
            vitruals: true,
            getters: true
        },
        id: false
    }
);

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        
    }
})

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.link();
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought
