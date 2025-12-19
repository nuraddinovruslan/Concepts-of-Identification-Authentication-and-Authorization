const { Schema, model } = require("mongoose");

const Book = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    pages: {
        type: Number,
        required: true
    },
    published_year: {
        type: String,
        required: false,
        default: null
    },
    image_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
       genre: {
        type: String,
        required: true
    },
       period: {
        type: String,
        required: true
    },
    published_home: {
        type: String,
        required: true
    },
},
{
    versionKey: false,
    timestamps: true
}
)

const BookSchema = model("Book", Book   )
module.exports = BookSchema