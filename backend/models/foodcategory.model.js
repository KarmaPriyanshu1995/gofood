const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const foodCategorySchema = new Schema(
    {
        CategoryName: { 
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

module.exports = mongoose.model('FoodCategory', foodCategorySchema);