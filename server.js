const express = require('express');
const http = require("http");
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Data = require('./models/data');
const bcrypt = require('bcryptjs');
const fs = require("fs");
const jwt = require('jsonwebtoken');
const uri = "mongodb+srv://Admin:Massi2001.@cluster0.xoqeknq.mongodb.net/appdb?retryWrites=true&w=majority";
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfj';
const { createDoc, insertDoc, query, deleteDoc, modifyDoc, getIV } = require('./pwdFunc');
const forge = require('node-forge');
const { validate } = require('./models/user');

var key = '';

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const app = express()

app.use(express.static("./"));
app.use(bodyParser.json())
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));

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
		return res.render(__dirname + '/public/mainPages/key.html', { name: req.user.username });

	} catch (err) {
		return res.redirect("/login");
	}
})

app.get('/home', async (req, res) => {
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
			return res.render(__dirname + '/public/mainPages/home.html', { name: req.user.username });
		} else {
			console.log("MISSING KEY");
			return res.redirect("/main");
		}
	} catch (err) {
		return res.redirect("/login");
	}
})


app.get('/', async (req, res) => {
	res.redirect('/main');
});

app.get('/login', async (req, res) => {
	res.render(__dirname + "/public/login/login.html")
})

app.get('/registration', async (req, res) => {
	res.render(__dirname + '/public/registration/registration.html');
})

app.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()
	key = '';
	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}
	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET,
			{ expiresIn: 3600 }
		)
		res.cookie('auth-token', token);
		return res.json({ status: 'ok' });
	}
	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/registration', async (req, res) => {
	const username = req.body.username;
	const plainTextPassword = req.body.password;
	const RepeatPassword = req.body.confirm;
	if (!username || typeof username !== 'string') {
		res.json({ status: 'error', error: 'Username non valido' });
	}
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Password non valida' });
	}
	if (plainTextPassword.length < 5) {
		return res.json({ status: 'error', error: 'Password troppo corta. Inserire almeno 6 caratteri.' });
	}
	if (plainTextPassword != RepeatPassword) {
		return res.json({ status: 'error', error: 'Le password non combaciano.' });
	}
	const password = await bcrypt.hash(plainTextPassword, 10);
	try {
		const response = await User.create({
			username,
			password
		})
		console.log('Utente creato: ', response)
		await createDoc(username);
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'Username già in uso.' })
		}
		throw error
	}
	res.json({ status: 'ok' });

});


app.post('/sendData', async (req, res) => {
	try {
		let cookie = req.headers.cookie;
		cookie = cookie.split("=")[1];
		const decoded = jwt.verify(cookie, JWT_SECRET);
		req.user = decoded;
		var doc = await query(req.user.username, key);
		res.json(doc.encryptedVault.encryptedData);
	} catch (e){
		console.log(e);
	}
});

app.post('/addPassword', async (req, res) => {
	const {user, title, username, password, url, notes} = req.body;
	var doc = {
		title: title,
		username: username,
		password: password,
		url: url,
		notes: notes
	}
	console.log(doc, user);
	insertDoc(user, doc, key);
})


app.post('/deletePassword', async (req, res) => {
	const {username, index} = req.body;
	deleteDoc(username, key, index);
})


app.post('/modPassword', async (req, res) => {
	const {user, title, username, password, url, notes, index } = req.body;
	var doc = {
		title: title,
		username: username,
		password: password,
		url: url,
		notes: notes
	}
	modifyDoc(user, key, doc, index);
})


app.post("/key", async (req, res) => {
	const {inputKey, username} = req.body;
	async function validateKey(inputKey, username){
		var iv = await getIV(username);
		var key = forge.pkcs5.pbkdf2(inputKey, iv, 1, 16);
		try {
			let doc = await query(username, key);
			res.json({status: 'ok'});
			return key;
		} catch (e){
			console.log(e)
			res.json({status: 'error', error: 'Invalid key'});
		}
		
	}
	console.log(inputKey);
	key = await validateKey(inputKey, username);
})
//deve stare ultima questa
app.get('/:name', async (req, res) => {
	switch (req.params.name) {
		case 'privacy':
			res.render(__dirname + "/public/pages/privacy.html");
			break;
		case 'terms':
			res.render(__dirname + "/public/pages/terms.html");
			break;
		default:
			res.render(__dirname + "/public/pages/404.html");
			break;
	}
});


const options = {
	key: fs.readFileSync("server.key"),
	cert: fs.readFileSync("server.cert"),
};


//https.createServer(options, app).listen(PORT, function (req, res) {
http.createServer(options, app).listen(PORT, function (req, res) {
	console.log("Server started at port " + PORT);
});
