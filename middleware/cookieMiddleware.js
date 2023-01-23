const jwt = require("jsonwebtoken");
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfj';

const validateCookie = async (req,res, next) => {
    let cookie = req.headers.cookie;
	try {
		cookie = cookie.split("=")[1];
	} catch {
        console.log("MISSING TOKEN");
		return res.redirect("/login");
	}
	try {
		const decoded = jwt.verify(cookie, JWT_SECRET);
		req.user = decoded;
		console.log("Token verified!");
        return next();
	} catch {
        console.log("INVALID TOKEN");
        return res.redirect("/login");
	}
}

const validateKeyCookie = async (req, res, next) => {
	let cookie = req.headers.cookie;
	try {
		cookie = cookie.split("=")[1];
	} catch {
		console.log("MISSING TOKEN");
		key = '';
		return res.redirect("/login");
	}
	try {
		const decoded = jwt.verify(cookie, JWT_SECRET);
		req.user = decoded;
		console.log("Token verified!");
		console.log(req.user);
		if (key != ''){
			console.log("Key verified!");
			return next();
		} else {
			console.log("MISSING KEY");
			return res.redirect("/main");
		}
	} catch (err) {
		console.log("Questo è l'errore della validateKeyCookie function:\n",err)
		return res.redirect("/login");
	}
}

const cookiesFunc = {
	validateCookie: validateCookie,
	validateKeyCookie: validateKeyCookie
}

module.exports = cookiesFunc;
/*
app.get('/main', async (req, res) => {
	let cookie = req.headers.cookie;
	try {
		cookie = cookie.split("=")[1];
	} catch {
		console.log("MISSING TOKEN");
		return res.redirect("/login");
	}
	try {
		const decoded = jwt.verify(cookie, JWT_SECRET);
		req.user = decoded;
		console.log("Token verified!");
		return res.render(__dirname + '/public/mainPages/key2.html', { name: req.user.username });
	} catch (err) {
		console.log("")
		return res.redirect("/login");
	}
})




let cookie = req.headers.cookie;
	try {
		cookie = cookie.split("=")[1];
	} catch {
		console.log("MISSING TOKEN");
		key = '';
		return res.redirect("/login");
	}
	try {
		const decoded = jwt.verify(cookie, JWT_SECRET);
		req.user = decoded;
		console.log("Token verified!");
		console.log(req.user);
		if (key != ''){
			console.log("Key verified!");
			return res.render(__dirname + '/public/mainPages/home2.html', { name: req.user.username });
		} else {
			console.log("MISSING KEY");
			return res.redirect("/main");
		}
	} catch (err) {
		return res.redirect("/login");
	}
*/