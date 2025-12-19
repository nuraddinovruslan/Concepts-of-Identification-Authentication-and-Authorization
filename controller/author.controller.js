const AuthorSchema = require("../schema/author.schema");

const getAllAuthors = async (req, res) => {
    try {
        const authors = await AuthorSchema.find()

        res.status(200).json(authors)
    }catch(error) {
        console.log(error.message);
    }
}

const search = async (req, res) => {
    try {
        const {name} = req.query
        const searchingResult = await AuthorSchema.find({
            full_name: {$regex: name, $options: "i"}
        })

        res.status(200).json(searchingResult)
    }catch(error) {
        console.log(error.message);
    }
}

const getOneAuthor = async (req, res) => {
    try {
        const {id} = req.params
        const author = await AuthorSchema.findById(id)

        if(!author) {
            return res.status(404).json({
                message: "Author not found"
            })
        }

        res.status(200).json(author)
    }catch(error) {
        console.log(error.message);
    }
}

const addAuthor = async (req, res) => {
    try {
        const {full_name, birth_year, death_year, bio, region, creativity, image_url, genre, period} = req.body
        await AuthorSchema.create({full_name, birth_year, death_year, bio, region, creativity, image_url, genre, period})
        res.status(201).json({
            message: "Added Author"
        })
    }catch(error) {
        console.log(error.message);
    }
}

const updateAuthor = async (req, res) => {
    try {
        const {id} = req.params
        const author = await AuthorSchema.findById(id)
        const {full_name, birth_year, death_year, bio, region, creativity, image_url, genre, period} = req.body
        if(!author) {
            return res.status(404).json({
                message: "Author not found"
            })
        }

        await AuthorSchema.findByIdAndUpdate(id, 
            {full_name, birth_year, death_year, bio, region, creativity, image_url, genre, period})

        res.status(200).json({
            message: "Author Updated"
        })
    }catch(error) {
        console.log(error.message);
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const {id} = req.params
        const author = await AuthorSchema.findById(id)
        if(!author) {
            return res.status(404).json({
                message: "Author not found"
            })
        }

        await AuthorSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Author deleted"
        })
    }catch(error) {
        console.log(error.message);
    }
}

module.exports = {
    getAllAuthors,
    addAuthor,
    getOneAuthor,
    updateAuthor,
    deleteAuthor,
    search
}
