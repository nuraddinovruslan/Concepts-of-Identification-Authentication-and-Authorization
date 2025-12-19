const {Router} = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook } = require("../controller/book.controller")

const bookRouter = Router()

bookRouter.get("/get_all_books", getAllBooks)
bookRouter.post("/add_book", getOneBook)
bookRouter.get("/get_one_book/:id", addBook)
bookRouter.put("/update_book/:id", updateBook)
bookRouter.delete("/delete_book/:id", deleteBook)

module.exports = bookRouter