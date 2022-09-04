const Data = require('./models/data');
const mongoose = require('mongoose');
const uri = "mongodb+srv://Admin:Massi2001.@cluster0.xoqeknq.mongodb.net/appdb?retryWrites=true&w=majority";
const { encrypt, decrypt } = require('./hashingFunction');
const forge = require('node-forge');
async function create(user){
    try {
        const user_id = user;
        const response = await Data.create({
            app: 'Password Wallet',
            version: '0.0.1',
            user_id: user_id,
            encryptedVault: {
                iv: forge.random.getBytesSync(32),
                encryptedData:[]
            } 
        })
        console.log('documento creato: ', response);
    } catch (error) {
        throw error
    }
}

async function insert(user_id, dataDoc, key){
    try {
        const documento = await query(user_id, key);
        console.log(documento);
        documento.encryptedVault.encryptedData.push(JSON.stringify(dataDoc));
        await Data.updateOne(
            {user_id: user_id}, 
            {"encryptedVault.encryptedData.0": encrypt(key, documento.encryptedVault.iv, documento.encryptedVault.encryptedData)});
    } catch(e){
        throw e;
    }
}

async function query(user_id, key){
    const documento = await Data.findOne({ user_id }).lean();
  //  console.log("QUESTO E' IL SUO DOCUMENTO " + documento + "\nQUESTO E' LO USER_ID = " + user_id);
    if (documento.encryptedVault.encryptedData.length != 0){
        documento.encryptedVault.encryptedData = decrypt(key, documento.encryptedVault.iv, documento.encryptedVault.encryptedData[0]);
        try{
            documento.encryptedVault.encryptedData = JSON.parse(documento.encryptedVault.encryptedData);
        } catch (e){
           throw e
        }
    }
    return documento;
}

async function deleteDoc(user_id, key, index){
    const documento = await query(user_id, key);
    documento.encryptedVault.encryptedData.splice(index, 1);
    await Data.updateOne(
    {user_id: user_id}, 
    {"encryptedVault.encryptedData.0": encrypt(key, documento.encryptedVault.iv, documento.encryptedVault.encryptedData)});
}


async function modifyDoc(user_id, key, doc, index){
    await  insert(user_id, doc, key);
    deleteDoc(user_id, key, index);
}

async function getIV(user_id){
    const doc = await Data.findOne({user_id}).lean();
    return doc.encryptedVault.iv;
}


const gestPwd = {
    createDoc: create,
    insertDoc: insert,
    query: query,
    deleteDoc: deleteDoc,
    modifyDoc: modifyDoc,
    getIV: getIV
};

module.exports = gestPwd;


/*
 <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand">Password Wallet</a>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/main">Home</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <button type="button" class="btn btn-dark" onclick="logout()">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
*/
/*
//////////////////////////////////////////////////////////
TEST
/////////////////////////////////////////////////////////

mettere mongoose.disconnect()

//create('req.body.user_id', 'lavoro');
//insert('req.body.user_id', dataDoc);
//query('req.body.user_id');

const doc = {
    title: 'req.body.title',
    username: 'req.body.accUsername',
    password: 'req.body.accPassword',
    url: 'req.body.accUrl',
    notes: 'req.body.notes'
}

const dataDoc = {
        title: 'ballare',
        username: 'prova',
        password: 's3cr3tlosai',
        url: 'https://provanonloso.com',
        notes: 'provanonloso'
    }
*/