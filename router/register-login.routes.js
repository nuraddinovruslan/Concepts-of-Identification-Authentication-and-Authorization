const {Router} = require("express")
const { register, login } = require("../controller/register-login")

const registerLoginRoutes = Router()

registerLoginRoutes.post("/register", register)
registerLoginRoutes.post("/login", login)

module.exports = registerLoginRoutes