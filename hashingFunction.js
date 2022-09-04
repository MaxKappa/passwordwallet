const forge = require('node-forge');


function encrypt(key, iv, dataToEncrypt){
    dataToEncrypt = JSON.stringify(dataToEncrypt);
    var cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(dataToEncrypt));
    cipher.finish();
    var encrypted = cipher.output;
    return encrypted.toHex();
}

function decrypt(key, iv, encryptedData){
    encryptedData = forge.util.createBuffer(forge.util.hexToBytes(encryptedData));
    var decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({iv: iv});
    decipher.update(encryptedData);
    decipher.finish();
    var result = decipher.output.data;
    return result;
}


const hashFunc = {
    encrypt: encrypt,
    decrypt: decrypt
};

module.exports = hashFunc;