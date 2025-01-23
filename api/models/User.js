const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	},
	profileImage: {
		type: String,
		required: false,
		default: "https://www.google.com/imgres?q=logo%20userprofile&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fblue-circle-with-white-user_78370-4707.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile-logo&docid=JP5PRpyJBkDwcM&tbnid=ZzhEBaHQM02woM&vet=12ahUKEwi-mtWB1PSKAxWQ3jQHHd95AM4QM3oECEkQAA..i&w=626&h=626&hcb=2&ved=2ahUKEwi-mtWB1PSKAxWQ3jQHHd95AM4QM3oECEkQAA"
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	roles: {
		type: [Schema.Types.ObjectId],
		required: true,
		ref: 'Role'
	}
},
	{
		timestamps: true
	})


module.exports = mongoose.model('User', UserSchema)