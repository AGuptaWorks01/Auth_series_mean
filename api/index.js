require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const roleRoute = require('./routes/role')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const bookRoute = require('./routes/book.js')
const { seedBooksData } = require('./seed.js')

const app = express()
// const port = 3000

app.use(cors({
	origin: "http://localhost:4200",
	credentials: true
}))

app.use(cookieParser())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(express.json())

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 100,
	message: "Too many requests, please try again after a minute.",
	standardHeaders: 'draft-8',
	legacyHeaders: false,
})

app.use(limiter)
app.use('/api/role', roleRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/book', bookRoute)

// Response handler Middleware
app.use((obj, req, res, next) => {
	const statusCode = obj.status || 500;
	const message = obj.message || "Something went wrong!"
	return res.status(statusCode).json({
		success: [200, 201, 204].some(a => a === obj.status) ? true : false,
		status: statusCode,
		message: message,
		data: obj.data
	})
})

// DB Connection
const ConnectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL)
		if (process.argv.includes("--seed")) {
			await seedBooksData()
		}
		console.log("Connected to Database");
	} catch (error) {
		console.log(error);
	}
}


app.listen(process.env.PORT, () => {
	ConnectMongoDB()
	console.log(`Server Running on http://localhost:${process.env.PORT}`)
})