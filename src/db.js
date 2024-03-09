const mongoose = require('mongoose');
const URI =    `mongodb+srv://ahsan4u:0eQmQfAQUbOME3Qk@cluster0.buiagj2.mongodb.net/`;

const connectDB = async ()=> {
    try {
        mongoose.connect(URI);
        console.log('db successfully connected');
    } catch (error) {
        console.log(`db connection ${error}`);
    }
}

module.exports = connectDB;
