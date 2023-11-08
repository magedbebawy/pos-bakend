class Errors {
    success(message, data) {
        return {
            message,
            status: 200,
            error: null,
            data
        }
    }

    serverError(error) {
        return {
            message: 'Internal server error',
            status: 500,
            error: error.message || error
        }
    }

    validationError(error) {
        return {
            message: 'Validation error',
            status: 400,
            error
        }
    }

    authorizationError(error) {
        return {
            message: 'Not authorized',
            status: 401,
            error: error.message || error
        }
    }
}

module.exports = Errors;