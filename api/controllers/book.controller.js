const Book = require('../models/Book')
const { CreateError } = require('../utils/error')
const { CreateSuccess } = require('../utils/success')

exports.getBooks = async (req, res, next) => {
	try {
		const books = await Book.find()
		return next(CreateSuccess(200, "All Users", books))
	} catch (error) {
		return next(CreateError(500, "Internal Server Error"))
	}
}