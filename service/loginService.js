const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfj';


const loginService = async (req, res) => {
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
}

module.exports = loginService;