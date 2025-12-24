const { Schema, model } = require("mongoose");

const Author = new Schema({
    full_name: {
        type: String,
        required: [true, "full_name kiritilishi shart"],
        unique: false,
        set: value => value.trim(),
        minLength: [3, "Kamida 3 ta harfdan iborat bolsin"],
        match: [/^[a-zA-Z]+$/, 'Faqat harflar kiriting'],
        trim: true,
    },
    birth_year: {
        type: Number,
        required: true,
        max: [new Date().getFullYear() - 15, "Adib kamida 16 yoshda bolishi kerak"],
        min: 0
    },
    death_year: {
        type: String,
        required: false,
        default: null,
        max: new Date().getFullYear()
    },
    image_url: {
        type: String,
        required: true,
        minLength: [15, "Kamida 15 ta harfdan iborat bolsin"],
    },
    bio: {
        type: String,
        required: true,
        maxLength: 10000,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        enum: {
            values: ["Historical", "Drama", "Horror", "Romans", "Detective", "Documentary", "Science fiction", "Fantasy", "Comedy", "Reality",
                "Animation", "Thriller", "Advanture", "Novel", "Poetry", "Satir", "Melo drama", "Action"],
            message: `{VALUE} bunday qiymat qabul qilinmaydi`
        }
    },
    period: {
        type: String,
        required: true,
        enum: {
            values: ["Temuriylar davri", "Jadid adabiyoti", "Sovet davri", "Mustaqillik davri"],
            message: `{VALUE} bunday qiymat qabul qilinmaydi`
        }
    },
    creativity: {
        type: String,
        required: true,
        maxLength: 1000
    },
    region: {
        type: String,
        required: true,
        maxLength: 60
    },
    // author_id: {
    //     type: String,
    //     required: true,
    //     ref: "Author"
    // }
},
    {
        versionKey: false,
        timestamps: true
    }
)

const AuthorSchema = model("Author", Author)
module.exports = AuthorSchema