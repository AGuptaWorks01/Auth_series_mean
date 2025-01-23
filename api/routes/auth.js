const express = require('express')
const { register, login, registerAdmin, sendEmail, resetPassword } = require('../controllers/auth.controller')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/register-admin', registerAdmin)
router.post('/send-email', sendEmail)
router.post('/reset-password', resetPassword)


module.exports = router;