const User = require("../models/User");

// GET
// Homepage
exports.homepage = async (req, res) => {
	const messages = await req.consumeFlash("info");
	const locals = {
		title: "My Manager",
		description: "NodeJS User Management System",
	};

	let perPage = 8;
	let page = req.query.page || 1;

	try {
		// const users = await User.find({}).limit(20);
		const users = await User.find({})
			.sort("createdAt")
			.skip(perPage * page - perPage)
			.limit(perPage);

		const count = await User.count();
		res.render("index", {
			locals,
			messages,
			users,
			current: page,
			pages: Math.ceil(count / perPage),
		});
	} catch (error) {
		console.log(error);
	}
};

// GET
// About Page
exports.about = async (req, res) => {
	const locals = {
		title: "About",
		description: "NodeJS User Management System",
	};

	res.render("about", locals);
};

// GET
// Create customer form
exports.addUser = async (req, res) => {
	const locals = {
		title: "Add User",
		description: "NodeJS User Management System",
	};

	res.render("user/add", locals);
};

// POST
// Post New User
exports.postUser = async (req, res) => {
	try {
		await User.create({ ...req.body });
		await req.flash("info", "New User has been added.");
		res.redirect("/");
	} catch (error) {
		console.log(err);
	}
};

// GET
// View User
exports.viewUser = async (req, res) => {
	const locals = {
		title: "View User Data",
		description: "NodeJS User Management System",
	};
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.render("404");
		}
		res.render("user/view", { user, locals });
	} catch (error) {
		console.log(err);
	}
};

// GET
// Edit User Page
exports.editUser = async (req, res) => {
	const messages = await req.consumeFlash("info");
	const locals = {
		title: "Edit User Data",
		description: "NodeJS User Management System",
	};
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.render("404");
		}
		res.render("user/edit", { user, locals, messages });
	} catch (error) {
		console.log(err);
	}
};

// PUT
// Edit User Data
exports.editPost = async (req, res) => {
	const { id } = req.params;
	const { firstName, lastName, email, tel, details } = req.body;

	try {
		const user = await User.findByIdAndUpdate(
			id,
			{
				firstName,
				lastName,
				email,
				tel,
				details,
			},
			{ new: true }
		);
		if (!user) {
			return res.render("404");
		}
		await req.flash("info", "Update Successful!");
		res.redirect(`/edit/${id}`);
	} catch (error) {
		console.log(err);
	}
};

// DELETE
// Delete User
exports.deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) {
			return res.render("404");
		}
		await req.flash("info", "Deleted Successfully!");
		res.redirect("/");
	} catch (error) {
		console.log(err);
	}
};

// POST
// Search for a User
exports.searchUser = async (req, res) => {
	const locals = {
		title: "Search Results",
		description: "NodeJS User Management System",
	};

	try {
		const { search } = req.body;
		const users = await User.find({
			$or: [
				{ firstName: { $regex: search, $options: "i" } },
				{ lastName: { $regex: search, $options: "i" } },
				{ email: { $regex: search, $options: "i" } },
			],
		});

		res.render("search", { users, locals, search });
	} catch (error) {
		console.log(err);
	}
};
