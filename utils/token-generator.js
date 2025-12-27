const jwt = require("jsonwebtoken")
const customErrorHandler = require("./custom-error-handler")

const AccessToen = (payload) => {
    try{
        return jwt.sign(payload, process.env.SECRET, {expiresIn: "20m"})
    }catch(error) {
        throw customErrorHandler.BadRequest(error.message)
    }
}

const refreshToken = (payload) => {
    try{
        return jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: "20d"})
    }catch(error) {
        throw customErrorHandler.BadRequest(error.message)
    }
}

module.exports = {
    AccessToen,
    refreshToken
}

