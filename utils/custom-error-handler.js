module.exports = class customErrorHandler extends Error {
    constructor(status, message, errors) {
        super(message)
        this.status = status,
            this.errors = errors
    }

    static UnAuthorized(message, errors = []) {
        return new customErrorHandler(401, message, errors)
    }

    static BadRequest(message, errors = []) {
        return new customErrorHandler(400, message, errors)
    }

    static NotFound(message, errors = []) {
        return new customErrorHandler(404, message, errors)
    }

}

