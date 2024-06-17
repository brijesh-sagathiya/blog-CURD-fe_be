const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    envConfig: { jwtSecret, cookieName },
} = require('../config/config')

exports.register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: 'User already exists' })

        user = new User({ username, email, password })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        res.status(200).json({ message: 'User has successfully registered.' })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid credentials' })

        const payload = { user: { id: user.id } }
        jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err

            res.cookie(cookieName, token, {
                httpOnly: true,
            })
                .status(200)
                .json({
                    message: 'Logged in successfully',
                })
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}
