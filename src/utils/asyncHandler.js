// Middleware for handling asynchronous request handlers
const asyncHandler = (requestHandler) => {
    // Returning a function that takes request, response, and next as parameters
    return (req, res, next) => {
        // Wrapping the request handler in a Promise to handle asynchronous operations
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

// Exporting the asyncHandler function for use in other parts of the application
export { asyncHandler };




// Method2 to do the same but using try catch instead of promises

// const asyncHandler = (fn)=> async (req,res,next)=>{
//     try {
//         await fn(req,res,next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }