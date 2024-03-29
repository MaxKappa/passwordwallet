const express = require('express');
const https = require("https");
const PORT = process.env.PORT || 443;
const bodyParser = require('body-parser');
const fs = require('fs');
const dotenv = require('dotenv');
const {validateCookieMiddleware, validateKeyCookieMiddleware} = require('./middleware/cookieMiddleware');
const validateKeyMiddleware = require('./middleware/keyMiddleware');
const loginService = require('./service/loginService');
const registrationService = require('./service/registrationService');
const { addService, deleteService, sendDataService, updateService } = require('./service/dataService');
const { DBconnect } = require('./service/dbService');

DBconnect();

const app = express()

app.use(express.static("./"));
app.use(bodyParser.json())
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/main', validateCookieMiddleware, async (req, res) => {
	res.render(__dirname + '/public/mainPages/key2.html', { name: req.user.username });
})

app.get('/home', validateKeyCookieMiddleware, async (req, res) => {
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

app.post('/login', loginService);

app.post('/registration', registrationService);

app.post('/sendData', sendDataService);

app.post('/addPassword',addService);

app.post('/deletePassword', deleteService);

app.post('/modPassword', updateService);


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
	key: fs.readFileSync("./key.pem"),
	cert: fs.readFileSync("./cert.pem"),
};


//https.createServer(options, app).listen(PORT, function (req, res) {
https.createServer(options, app).listen(PORT, function (req, res) {
	console.log("Server started at port " + PORT);
});


/*
Git commands:
git add .
git commit -am "message"
git push 
*/
