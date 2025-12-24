const BookSchema = require("../schema/book.schema");
const customErrorHandler = require("../utils/custom-error-handler");

const getAllBooks = async (req, res, next) => {
    try {
        const books = await BookSchema.find().populate("author_id", "-_id")

        res.status(200).json(books)
    } catch (error) {
        next(error)
    }
}

const getOneBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await BookSchema.findById(id)

        if (!book) {
            throw customErrorHandler.NotFound("Book not found")
        }

        res.status(200).json(book)
    } catch (error) {
        next(error)
    }
}

const addBook = async (req, res, next) => {
    try {
        const { title, pages, published_home, description, published_year, image_url, genre, period, author_id } = req.body
        await BookSchema.create({ title, pages, published_home, description, published_year, image_url, genre, period, author_id })
        res.status(201).json({
            message: "Added Book"
        })
    } catch (error) {
        next(error)
    }
}

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await BookSchema.findById(id)
        const { title, pages, published_home, description, published_year, image_url, genre, period, author_id } = req.body
        if (!book) {
            throw customErrorHandler.NotFound("Book not found")
        }

        await BookSchema.findByIdAndUpdate(id,
            { title, pages, published_home, description, published_year, image_url, genre, period, author_id })

        res.status(200).json({
            message: "Book Updated"
        })
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await BookSchema.findById(id)
        if (!book) {
            throw customErrorHandler.NotFound("Book not found")
        }

        await BookSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Book deleted"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllBooks,
    getOneBook,
    updateBook,
    deleteBook,
    addBook
}
