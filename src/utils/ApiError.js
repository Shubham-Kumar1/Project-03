// Defining a custom error class, ApiError, extending the built-in Error class
class ApiError extends Error {
    constructor(
        // Constructor parameters with default values
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        // Calling the constructor of the parent class (Error) with the provided message
        super(message);

        // Setting properties specific to the ApiError class
        this.statusCode = statusCode; // HTTP status code
        this.data = null; // Additional data (set to null by default)
        this.message = message; // Error message
        this.success = false; // Indicator of unsuccessful operation
        this.errors = errors; // Array of error details

        // Checking if a stack trace is provided; if not, capturing the stack trace
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Exporting the ApiError class for use in other parts of the application
export { ApiError };
