const jwt = require("jsonwebtoken")
const customErrorHandler = require("../utils/custom-error-handler")

const Authorizaton = async (req, res, next) => {
    try {
    const bearerToken = req.headers.authorization

     if(!bearerToken){
        throw customErrorHandler.UnAuhtorized("Bearer token not found!")
     }

     const token = bearerToken.split(" ")

     if(token[0] !== "Bearer") {
        throw customErrorHandler.UnAuhtorized("Bearer not found!")
     }

     if(!token[1]){
         throw customErrorHandler.UnAuhtorized("Token not found!")
     }


     const decode = jwt.verify(token[1], process.env.SECRET_KEY)
      req.user = decode
      
      next()
    } catch (error) {
      next(error)
    }
}

module.exports = {
    Authorizaton
}