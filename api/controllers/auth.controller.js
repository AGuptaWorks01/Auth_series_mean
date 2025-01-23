const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const User = require('../models/User.js')
const Role = require('../models/Role.js')
const { CreateError } = require('../utils/error.js')
const { CreateSuccess } = require('../utils/success.js');
const UserToken = require('../models/UserToken.js');

exports.register = async (req, res, next) => {
	const role = await Role.find({ role: 'User' })
	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)
	const newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.userName,
		email: req.body.email,
		password: hashPassword,
		roles: role
	})
	await newUser.save()
	return res.status(200).json('User register successfully')
	// return next(CreateSuccess(200, "User Register Successfully!"))
}


exports.registerAdmin = async (req, res, next) => {
	const role = await Role.find({})
	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)
	const newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: req.body.email,
		password: hashPassword,
		isAdmin: true,
		roles: role
	})
	await newUser.save()
	return next(CreateSuccess(200, "Admin Register Successfully!"))
}


exports.login = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email })
			.populate('roles', 'role')

		const { roles } = user
		if (!user) {
			return res.status(404).send('user not found!')
		}
		const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
		if (!isPasswordCorrect) {
			return res.status(400).send("Password is incorrect!")
		}

		const token = jwt.sign({
			id: user._id,
			isAdmin: user.isAdmin,
			roles: user.roles
		}, process.env.JWT_SECRETKEY)

		res.cookie("access_token", token, { httpOnly: true })
			.status(200)
			.json({
				status: 200,
				message: "Login Success!",
				data: {
					_id: user._id,
					email: user.email,
					roles: user.roles
				}
			})
	} catch (error) {
		return res.status(500).send('Something is worng')
	}
}


exports.sendEmail = async (req, res, next) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email: email });
		if (!user) {
			return next(CreateError(404, 'User not found to reset the email!'));
		}
		const payload = { email: user.email };
		const expiryTime = 300;
		const token = jwt.sign(payload, process.env.JWT_SECRETKEY, { expiresIn: expiryTime });

		const newToken = new UserToken({
			userId: user._id,
			token: token
		});
		
		const mailTransporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			},
			tls: {
				rejectUnauthorized: false
			}
		});
		let mailDetails = {
			from: "ganurag624outlook@gmail.com",
			to: email,
			subject: "Reset Password!",
			html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password</title>
        </head>
        <body>
            <h2>Reset Your Password</h2>
            <p>Dear ${user.username},</p>
            <p>We have received a request to reset your password for your account with Growing..</p>
            <a href="${process.env.LIVE_URL}/reset/${token}">
                <button style="background-color: #4CAF50; color:white; padding: 14px 20px; border: none; cursor:pointer; border-radius: 4px;">Reset Password</button>
            </a>
            <p>Please note that this link is only valid for 5 minutes.</p>
            <p>Thank You,</p>
        </body>
        </html>
      `
		}

		mailTransporter.sendMail(mailDetails, async (err, data) => {
			if (err) {
				console.log(err);
				return next(CreateError(500, "Something went wrong while sending the email"));
			} else {
				await newToken.save();
				return next(CreateSuccess(200, "Email sent successfully!"));
			}
		});
	} catch (error) {
		console.error(error);
		return next(CreateError(500, "Internal server error"));
	}
}


exports.resetPassword = (req, res, next) => {
	const token = req.body.token;
	const newPassword = req.body.password

	jwt.verify(token, process.env.JWT_SECRETKEY, async (err, data) => {
		if (err) {
			return next(CreateError(500, " Reset Link is Expired!"))
		} else {
			const response = data
			const user = await User.findOne({ email: response.email })
			const salt = await bcrypt.genSalt(10)
			const encryptedPassword = await bcrypt.hash(newPassword, salt)
			user.password = encryptedPassword
			try {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: user._id },
					{ $set: user },
					{ new: true }
				)
				return next(CreateSuccess(200, "Password Reset Seccess!"))
			} catch (error) {
				return next(CreateError(500, "Something went wrong while resetting the password"))
			}
		}
	})
}
