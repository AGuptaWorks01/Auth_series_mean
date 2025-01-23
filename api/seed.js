const BookJson = require('./Bookstore.books.json');
const Book = require('./models/Book')

exports.seedBooksData = async () => {
	try {
		await Book.deleteMany({})
		await Book.insertMany(BookJson)
		console.log("Data seeded successfully")
	} catch (error) {
		console.error("Error:", error)
	}
}
