const jwt = require('jsonwebtoken');
const { CreateError } = require('./error');

exports.verifyToken = async (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		return next(CreateError(401, "You Are not authenticated"))
	}

	jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
		if (err) {
			return next(CreateError(403, "Token is not Valid"))
		} else {
			req.user = user;
			next();
		}
	})
}

exports.verifyUser = (req, res, next) => {
	this.verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return next(CreateError(403, "You are not authorized!"))
		}
	})
}

exports.verifyAdmin = (req, res, next) => {
	this.verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next()
		} else {
			return next(CreateError(403, "You are not authorized!"))
		}
	})
}