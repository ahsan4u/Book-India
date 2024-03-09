const mongoose = require('mongoose');
const URI =    `mongodb://127.0.0.1:27017/bookIndia`;

const connectDB = async ()=> {
    try {
        mongoose.connect(URI);
        console.log('db successfully connected');
    } catch (error) {
        console.log(`db connection ${error}`);
    }
}

module.exports = connectDB;