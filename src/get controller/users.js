const {Cart, Likes} = require('../modules');



const signInUp = (req, res)=> {
    res.render('sign-in-up');
};

const myAccount = async (req, res)=> {
    res.render('my-account');
}

// User Logout
const logout = (req, res)=> {
    req.session.user = null;
    res.redirect('/');
}

// Cart
const myCart = async (req, res)=> {
    const userId = req.session.user._id;
    const cart = await Cart.findOne({ userId }).populate('books');
    if(!cart) return res.render('cart');
    const books = cart.books
    res.render('cart', {books});
};

// Likes
const MyLikes = async (req, res)=> {
    const userId = req.session.user._id;
    const likes = await Likes.findOne({ userId }).populate('books');
    if(!likes) return res.render('likes');
    const books = likes.books;
    res.render('likes', {books});
};

module.exports = { signInUp, logout, myAccount, myCart, MyLikes }