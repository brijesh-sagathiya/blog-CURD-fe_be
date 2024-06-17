const jwt = require('jsonwebtoken')
const {
    envConfig: { jwtSecret, cookieName },
} = require('../config/config')

module.exports = function (req, res, next) {
    const token = req.cookies[cookieName]

    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' })

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}
