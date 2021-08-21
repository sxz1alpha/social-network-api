const { Schema, model, Types } = require('mongoose');

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
        userName: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: createdAtVal => formatDate(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema ({
        thoughtText: {
            type: String, 
            required: true,
            max: 280     
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: createdAtVal => formatDate(createdAtVal)
        },
        userName: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJson: {
            vitruals: true,
            getters: true
        },
        id: false
    }
);


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought
