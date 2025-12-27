const nodemailer = require("nodemailer")
const customErrorHandler = require("./custom-error-handler")

module.exports = async function(code, email) {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nuraddinovruslan76@gmail.com",
                pass: process.env.APP_KEY
            }
        })
        await transporter.sendMail({
            from: "nuraddinovruslan76@gmail.com",
            to: email,
            subject: "Library verification",
            text: "ushbu xabarda tasdiqlash kodi bor",
            html: `<b>${code}c</b>`
        })
    }catch(error) {
        throw customErrorHandler.BadRequest(error.message)
    }
}