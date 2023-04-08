const corsMiddleware = (req, res, next) => {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "https://bloghub-reborn.netlify.app");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Set custom headers for CORS
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header,Cookies");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    return next();
};

module.exports = corsMiddleware