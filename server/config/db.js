const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log("CONNECTED TO DB: ", conn.connection.host);
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectDB;
