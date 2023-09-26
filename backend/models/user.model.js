const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: { 
            type: String, 
            trim: true ,
            required: true
        },
        location: { 
            type: String, 
            trim: true ,
            required: true
        },
        email: { 
            type: String, 
            required: true
        },
        date: { 
            type: Date, 
            trim: true ,
            required: true,
            default:Date.now
        },
        password: { type: String, required: true, }
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
        },

        toObject: {
            getters: true,
        },
    }
);

module.exports = mongoose.model('user', UserSchema);