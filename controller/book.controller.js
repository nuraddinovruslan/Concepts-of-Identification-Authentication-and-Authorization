const BookSchema = require("../schema/book.schema");

const getAllBooks = async (req, res) => {
    try {
        const books = await BookSchema.find()

        res.status(200).json(books)
    } catch (error) {
        console.log(error.message);
    }
}

const getOneBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await BookSchema.findById(id)

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        res.status(200).json(book)
    } catch (error) {
        console.log(error.message);
    }
}

const addBook = async (req, res) => {
    try {
        const { title, pages, published_home, description, published_year, image_url, genre, period } = req.body
        await BookSchema.create({ title, pages, published_home, description, published_year, image_url, genre, period })
        res.status(201).json({
            message: "Added Book"
        })
    } catch (error) {
        console.log(error.message);
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await BookSchema.findById(id)
        const { title, pages, published_home, description, published_year, image_url, genre, period } = req.body
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        await BookSchema.findByIdAndUpdate(id,
            { title, pages, published_home, description, published_year, image_url, genre, period })

        res.status(200).json({
            message: "Book Updated"
        })
    } catch (error) {
        console.log(error.message);
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await BookSchema.findById(id)
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        await BookSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Book deleted"
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getAllBooks,
    getOneBook,
    updateBook,
    deleteBook,
    addBook
}
