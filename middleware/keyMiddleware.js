const forge = require('node-forge');
const { query, getIV } = require('../service/dbService');
key = '';

const validateKeyMiddleware = async (req, res, next) => {
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
}



module.exports = validateKeyMiddleware;

/*
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
*/