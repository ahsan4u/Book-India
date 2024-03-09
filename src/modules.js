const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    categorie: { type: String },
    auther: { type: String },
    publisher: { type: String },
    publishedDate: { type: String },
    isbn: { type: String },
    binding: { type: String },
    language: { type: String },
    pages: { type: String },
    width: { type: String },
    height: { type: String },


}, {timestamps: true});

const userSchema = new mongoose.Schema({
    firstname: { type: String, requried: true },
    lastname: { type: String, requried: true },
    email: { type: String },
    mobile: { type: String, required: true },
    password: { type: String, required: true }, 
    admin: { type: Boolean, default: false },
    image: { type: String },
}, {timestamps: true});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }]
});

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'user' },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],
})
    
const Books = mongoose.model('book', bookSchema);
const Users = mongoose.model('user', userSchema);
const Cart = mongoose.model('cart', cartSchema);
const Likes = mongoose.model('like', likeSchema);


module.exports = {
    Books,
    Users,
    Cart,
    Likes
};