const express = require('express')
const { getBooks } = require('../controllers/book.controller')

const router = express.Router()

router.get("/", getBooks)

module.exports = router;