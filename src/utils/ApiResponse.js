// Defining a class for API responses
class ApiResponse {
    // Constructor with parameters for status code, data, and an optional message
    constructor(statusCode, data, message = "Success") {
        // Setting properties based on the provided parameters
        this.statusCode = statusCode; // HTTP status code
        this.data = data; // Response data
        this.message = message; // Response message (defaulted to "Success")
        this.success = statusCode < 400; // Indicator of successful operation (status code less than 400)
    }
}

// Exporting the ApiResponse class for use in other parts of the application
export { ApiResponse };
