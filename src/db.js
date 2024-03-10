const mongoose = require('mongoose');
const URI =    `mongodb://127.0.0.1:27017/bookIndia`;
// const URI =    `mongodb+srv://ahsan4u:ahsan1234@cluster0.buiagj2.mongodb.net/BookIndia`;

const connectDB = async ()=> {
    try {
        mongoose.connect(URI);
        console.log('db successfully connected');
    } catch (error) {
        console.log(`db connection ${error}`);
    }
}

module.exports = connectDB;