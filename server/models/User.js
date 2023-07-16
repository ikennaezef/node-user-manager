const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		tel: {
			type: String,
			required: true,
		},
		details: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
