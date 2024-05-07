const { response } = require('express');
const {Cart, Likes, Address} = require('../modules');



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
    if(!req.session || !req.session.user) { res.render('sign-in-up'); return; }

    const userId = req.session.user._id;
    const cart = await Cart.findOne({ userId }).populate('books.book');
    const books = cart.books.map((item)=> {
        const book = item.book;
        book.buyQty = item.qty;
        return book;
    });
    const itemCount = cart.books.length;
    let totalPrice = 0;
    cart.books.forEach((item)=> {totalPrice += item.book.price*item.qty;});
    res.render('cart', {books, itemCount, totalPrice});
};

// Order
const myOrder = async (req, res)=> {
    try {
        if(!req.session || !req.session.user) { res.render('sign-in-up'); return; }
        
        const userId = req.session.user._id;
        const orders = await Address.find({userId}).populate('book');
        const books = orders.map((item)=> {
            const book = item.book;
            book.price *= item.qty;
            book.status = item.status;
            book.qty = item.qty;
            return book;
        });
        res.render('my-order', {books});
    } catch (error) {
        res.send('at my order '+error);
    }
    
}

// Likes
const MyLikes = async (req, res)=> {
    const userId = req.session.user._id;
    const likes = await Likes.findOne({ userId }).populate('books');
    if(!likes) return res.render('likes');
    const books = likes.books;
    res.render('likes', {books});
};

// Address
const MyAddress = (req, res)=> {
    if(!req.session || !req.session.user) { response.redirect('/sign-in-up'); }
    const bookId = req.params.bookId;
    const qty = req.params.qty;
    res.render('address', {bookId, qty});
}

// Admin's order page
const allOrder = async (req, res)=> {
    if(!req.session || !req.session.user) { res.render('sign-in-up'); return; }
    if(!req.session.user.admin) { res.send('you are not authorised'); return; }

    let checkOrders = await Address.find({}).populate('book');
    const allOrders = checkOrders.map((order)=> {
        const time = order.createdAt.toISOString();
        order.time = time.substring(0, 10)+' '+time.substring(11, 19);
        
        order.amount = Number(order.qty) * Number(order.book.price);
        return order;
    })
    res.render('all-orders', {allOrders});
}

module.exports = { signInUp, logout, myAccount, myCart, myOrder, allOrder, MyLikes, MyAddress }