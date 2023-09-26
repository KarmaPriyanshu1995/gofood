const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        CategoryName: { 
            type: String, 
            trim: true ,
            required: true
        },
        name: { 
            type: String, 
            trim: true ,
            required: true
        },
        img: { 
            type: String, 
            trim: true ,
            required: true
        },
        options: { 
            type: Array, 
            required: true
        },
        description: { 
            type: String, 
            trim: true ,
            required: true
        },
        status: { type: Boolean, default: true }
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

module.exports = mongoose.model('Category', CategorySchema);