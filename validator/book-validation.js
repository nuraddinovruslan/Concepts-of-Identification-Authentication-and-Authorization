const Joi = require("joi")
const joi = require("joi")

exports.BookValidator = function(data) {
    try{
        const schema = Joi.object({
            title: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{2,150}$')).required(),
            pages: Joi.number().min(3).integer().required(),
            published_year: Joi.number().integer().max(new Date().getFullYear()).required(),
            image_url: Joi.string().min(15).required(),
            description: Joi.string().max(10000).required(),
            genre: Joi.string().lowercase().valid("Historical", "Drama", "Horror", "Romans", "Detective", "Documentary", "Science fiction", "Fantasy", "Comedy",
                 "Reality Animation", "Thriller", "Advanture", "Novel", "Poetry", "Satir", "Melo drama", "Action").required(),
            period: Joi.string().lowercase().valid("Temuriylar davri", "Jadid adabiyoti", "Sovet davri", "Mustaqillik davri").required(),
            published_home: Joi.string().min(3).max(100).required(),
            author_id: Joi.string().max(24).required(),
            quotes: Joi.string().min(5, "iqtibos juda qisqa").max(500)

        })

        return schema.validate(data)
    }catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
} 