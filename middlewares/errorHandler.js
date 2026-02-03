const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // You should also send a response to the client
    // so the request doesn't hang forever!
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

// ADD THIS LINE AT THE BOTTOM:
module.exports = errorHandler;