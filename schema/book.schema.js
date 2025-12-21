const { Schema, model } = require("mongoose");

const Book = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title majburiy"],
      unique: true,
      trim: true,
      minlength: [3, "Title kamida 3 ta belgidan iborat bolsin"],
      maxlength: [150, "Title 150 belgidan oshmasin"]
    },

    pages: {
      type: Number,
      required: [true, "Pages majburiy"],
      min: [1, "Sahifalar soni 1 dan kam bolmasin"],
      max: [10000, "Sahifalar soni juda katta"]
    },

    published_year: {
      type: Number,
      min: [1000, "Notogri yil"],
      max: [new Date().getFullYear(), "Hozirgi yildan buyogiga mumkin emas"],
      default: null
    },

    image_url: {
      type: String,
      required: [true, "Image URL majburiy"],
      match: [
        /^(http|https):\/\/[^ "]+$/,
      ]
    },

    description: {
      type: String,
      required: [true, "Description majburiy"],
      minlength: [10, "Description kamida 10 ta belgi bolsin"]
    },

    genre: {
      type: String,
      required: true,
      enum: {
        values: [
          "Fantasy",
          "History",
        ],
        message: "Notogri genre"
      }
    },

    period: {
      type: String,
      required: true,
    },

    published_home: {
      type: String,
      required: true,
      minlength: [2, "Nashriyot nomi juda qisqa"]
    },

    author_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author majburiy"]
    }
},
{
    versionKey: false,
    timestamps: true
}
)

const BookSchema = model("Book", Book   )
module.exports = BookSchema