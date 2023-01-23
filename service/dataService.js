const { query, insertDoc, deleteDoc, modifyDoc} = require('../helpers/dbHelper');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfj';


const sendDataService = async (req, res) => {
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
}

const addService = async (req, res) => {
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
}

const deleteService = async (req, res) => {
    const {username, index} = req.body;
	deleteDoc(username, key, index);
}

const updateService = async (req, res) => {
    const {user, title, username, password, url, notes, index } = req.body;
	var doc = {
		title: title,
		username: username,
		password: password,
		url: url,
		notes: notes
	}
	modifyDoc(user, key, doc, index);
}


module.exports = {
    sendDataService: sendDataService,
    addService: addService,
    deleteService: deleteService,
    updateService: updateService
}



