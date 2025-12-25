const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const bookRouter = require("./router/book.routes")
const errorMiddleware = require("./middleware/error-middleware")
const registerLoginRoutes = require("./router/register-login.routes")
require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors({origin: true, credentials: true}))
app.use(express.json())

connectDB()

//router
app.use(authorRouter)
app.use(bookRouter)
app.use(registerLoginRoutes)

app.use(errorMiddleware)

app.listen(PORT, () =>  {
    console.log("ishladi: " + PORT);
    
})
