"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const index = require("./routes/index");
const session = require("express-session");

app.set("view engine", "ejs");
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
	session({
		secret: "indomilk123",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 600000,
		},
	}),
);

app.use("/", index);

app.listen(port, () => {
	console.log(`Listening in port ${port}`);
});
