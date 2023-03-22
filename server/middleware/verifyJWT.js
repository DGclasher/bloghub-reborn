const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeaders = req.headers['authorization']

    if(!authHeaders) return res.sendStatus(401)

    
}