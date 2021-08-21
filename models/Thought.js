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
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => formatDate(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
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
            get: createdAtVal => formatDate(createdAtVal)
        },
        username: {
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
    return this.reaction.link();
});

const Thought = model('thought', ThoughtSchema);

module.exports = Thought
