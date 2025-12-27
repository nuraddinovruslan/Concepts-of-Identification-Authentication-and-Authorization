const {Router} = require("express")
const { getAllAuthors, addAuthor, getOneAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authorValidationMiddleware = require("../middleware/author-validation-middleware")
const access_token = require("../middleware/access_token")

const authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.post("/add_author", authorValidationMiddleware, access_token, addAuthor)
authorRouter.get("/get_one_author/:id", getOneAuthor)
authorRouter.put("/update_author/:id", updateAuthor)
authorRouter.delete("/delete_author/:id", deleteAuthor)
authorRouter.get("/search", search)

module.exports = authorRouter