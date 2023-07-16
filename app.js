require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const { flash } = require("express-flash-message");
const session = require("express-session");
const connectDB = require("./server/config/db");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
		},
	})
);

app.use(flash({ sessionKeyName: "flashMessage" }));

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/customerRoutes"));

app.get("*", (req, res) => {
	res.status(404).render("404");
});

const start = async () => {
	try {
		await connectDB();
		app.listen(port, () => {
			console.log(`SERVER RUNNING ON PORT ${port}`);
		});
	} catch (error) {
		console.log("COULD NOT START SERVER", error);
	}
};

start();
