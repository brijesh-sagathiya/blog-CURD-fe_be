require('dotenv').config()

const envConfig = {
    port: Number(process.env.PORT),
    mongoUrl: String(process.env.MONGO_URI),
    cookieName: String(process.env.COOKIE_NAME),
    jwtSecret: String(process.env.JWT_SECRET),
}

module.exports = { envConfig }
