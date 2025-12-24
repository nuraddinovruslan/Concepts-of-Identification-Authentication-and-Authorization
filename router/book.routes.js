const {Router} = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook } = require("../controller/book.controller")
const bookValidationMiddleware = require("../middleware/book-validation-middleware")

const bookRouter = Router()

bookRouter.get("/get_all_books", getAllBooks)
bookRouter.post("/add_book",bookValidationMiddleware, getOneBook)
bookRouter.get("/get_one_book/:id", addBook)
bookRouter.put("/update_book/:id", updateBook)
bookRouter.delete("/delete_book/:id", deleteBook)

module.exports = bookRouter