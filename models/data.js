const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
	{
		app: { type: String},
		version: { type: String},
        user_id: {type: String, required: true, unique: true},
        encryptedVault: {
            iv: {type: String},
            encryptedData: {type: Array}
        }
	},
	{ collection: 'data' }
);
//title is required;
const model = mongoose.model('DataSchema', DataSchema);

module.exports = model;