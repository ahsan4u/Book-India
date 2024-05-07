const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    categorie: { type: String },
    qty: {type: Number},
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
    fullname: { type: String, requried: true },
    mobile: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true }, 
    admin: { type: Boolean, default: false },
    image: { type: String, default: 'noprofile.png' },
}, {timestamps: true});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    books: [{book: { type: mongoose.Schema.Types.ObjectId, ref: 'book' }, qty: {type: Number}}],
});

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'user' },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],
})

const orderSchems = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'user' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
    qty: {type: Number},
    status: {type: Boolean, default: false},
    userAddress: {
        fullname: {type: String},
        mobile: {type: String},
        mobileAlt: {type: String},
        houseOrBuildingName: {type: String},
        roadName: {type: String},
        landmark: {type: String},
        pincode: {type: String},
        district: {type: String},
        state: {type: String},
    }
}, {timestamps: true});

const contactSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String},
    message: {type: String, required: true},
}, {timestamps: true});
    
const Books = mongoose.model('book', bookSchema);
const Users = mongoose.model('user', userSchema);
const Cart = mongoose.model('cart', cartSchema);
const Likes = mongoose.model('like', likeSchema);
const Address = mongoose.model('orderAddresses', orderSchems);
const Contacts = mongoose.model('contact', contactSchema);


module.exports = {
    Books,
    Users,
    Cart,
    Likes,
    Address,
    Contacts
};