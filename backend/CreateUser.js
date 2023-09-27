const express = require('express')
const router = express.Router()
const User = require('./models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecreate = "MyJwtSecreateIs VeryUnique#@%"
const { body, validationResult } = require('express-validator')
router.post("/createuser", [body('email').isEmail(), body('name').isLength({ min: 5 }), body('password', "Invalid password").isLength({ min: 5 })], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt)
    try {
        await User.create({
            name: req.body.name,
            password: securePassword,
            location: req.body.location,
            email: req.body.email,

        })
        res.json({ success: true })

    } catch (err) {
        console.log(err)
        res.json({ success: false })
    }
})



router.post("/loginuser", [body('email').isEmail(), body('password', "Invalid password").isLength({ min: 5 })], async (req, res) => {

    const email = req.body.email
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        let userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ error: "Try Loggning with correct Credaintles" })
        }
        const passwordCompair = await bcrypt.compare(req.body.password, userData.password)
        if (req.body.password !== userData.password) {
            return res.status(400).json({ error: "Try Loggning with correct Credaintles" })
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecreate)
        res.json({ success: true, authToken:authToken })
    } catch (err) {
        console.log(err)
        res.json({ success: false })
    }
})
module.exports = router;