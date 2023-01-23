const mongoose = require('mongoose');
const uri = "mongodb+srv://Admin:Massi2001.@cluster0.xoqeknq.mongodb.net/appdb?retryWrites=true&w=majority";

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