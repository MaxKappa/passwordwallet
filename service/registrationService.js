const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { createDoc } = require('../helpers/dbHelper');



const registrationService = async (req, res) => {
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


}

module.exports = registrationService;

/*
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
*/
