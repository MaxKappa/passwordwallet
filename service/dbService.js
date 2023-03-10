const mongoose = require('mongoose');
const uri = "mongodb+srv://"

mongoose.set('strictQuery', true);

async function DBconnect() {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB connected");
    }).catch((err) => {
        console.log(err);
    })
}



module.exports = { DBconnect }
