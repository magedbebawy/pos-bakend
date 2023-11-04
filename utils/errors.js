class Errors {
    success(message, data) {
        return {
            message,
            statusCode: 200,
            error: null,
            data
        }
    }

    serverError(error) {
        return {
            message: 'Internal server error',
            statusCode: 500,
            error: error.message || error
        }
    }

    validationError(error) {
        return {
            message: 'Validation error',
            statusCode: 400,
            error
        }
    }
}

module.exports = Errors;