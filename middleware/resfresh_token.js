const CustomErrorHandler = require("../utils/custom-error-handler")
const jwt = require("jsonwebtoken")
const { AccessToen } = require("../utils/token-generator")
module.exports = function (req, res, next) {
    try {
        const refresh_token = req.cookies.refresh_token
        if (!refresh_token) {
            throw CustomErrorHandler.UnAuthorized("Refresh token not found")
        }
        const decode = jwt.verify(refresh_token, process.env.REFRESH_SECRET)

        if (decode) {
            const payload = {
                username: decode.username,
                email: decode.email,
                role: decode.role,
                id: decode._id
            }

            const access_token = AccessToen(payload)

            res.cookie("access_token", access_token, { httpOnly: true, maxAge: 100 * 60 * 15 })


           return res.status(200).json({
                message: "success",
                access_token
            })
        }

    } catch (error) {
        next(error)
    }
}