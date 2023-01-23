const express = require('express');
const http = require("http");
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Data = require('./models/data');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uri = "mongodb+srv://Admin:Massi2001.@cluster0.xoqeknq.mongodb.net/appdb?retryWrites=true&w=majority";
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfj';
const { insertDoc, query, deleteDoc, modifyDoc } = require('./service/dbService');
const dotenv = require('dotenv');
const {validateCookie, validateKeyCookie} = require('./middleware/cookieMiddleware');
const validateKeyMiddleware = require('./middleware/keyMiddleware');
const loginMiddleware = require('./middleware/loginMiddleware');
const registrationMiddleware = require('./middleware/registrationMiddleware');

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

app.get('/main', validateCookie, async (req, res) => {
	res.render(__dirname + '/public/mainPages/key2.html', { name: req.user.username });
})

app.get('/home', validateKeyCookie, async (req, res) => {
	res.render(__dirname + '/public/mainPages/home2.html', { name: req.user.username });
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

app.post('/login', loginMiddleware);

app.post('/registration', registrationMiddleware);


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


app.post("/key", validateKeyMiddleware);

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

dotenv.config();

const options = {
	key: process.env.SSL_KEY,
	cert: process.env.SSL_CERT,
};


//https.createServer(options, app).listen(PORT, function (req, res) {
http.createServer(options, app).listen(PORT, function (req, res) {
	console.log("Server started at port " + PORT);
});


//git commit -m "first commit"
//git push
