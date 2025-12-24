const Joi = require("joi")
const joi = require("joi")

exports.AuthorValidator = function(data) {
    try{
        const schema = Joi.object({
            full_name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,50}$')).required(),
            birth_year: Joi.number().integer().required(),
            death_year: Joi.string().required(),
            image_url: Joi.string().min(15).required(),
            bio: Joi.string().max(1000).required(),
            genre: Joi.string().lowercase().valid("Historical", "Drama", "Horror", "Romans", "Detective", "Documentary", "Science fiction", "Fantasy", "Comedy",
                 "Reality Animation", "Thriller", "Advanture", "Novel", "Poetry", "Satir", "Melo drama", "Action").required(),
            period: Joi.string().lowercase().valid("Temuriylar davri", "Jadid adabiyoti", "Sovet davri", "Mustaqillik davri").required(),
            creativity: Joi.string().max(1000).required(),
            region: Joi.string().max(50).required()
        })

        return schema.validate(data)
    }catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
} 