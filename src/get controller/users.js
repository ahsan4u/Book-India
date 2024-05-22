jwt = require('jsonwebtoken');
const { response } = require('express');
const {Cart, Likes, Address} = require('../modules');



const signInUp = (req, res)=> {
    res.render('sign-in-up');
};

const myAccount = async (req, res)=> {
    res.render('my-account');
}

const logout = (req, res)=> {
    res.clearCookie('token');
    res.redirect('/');
}

// Cart
const myCart = async (req, res)=> {
    if(!req.cookies || !req.cookies.token) { res.render('sign-in-up'); return; }

    const userId = jwt.verify(req.cookies.token, 'ahsan4u')._id;
    const cart = await Cart.findOne({ userId }).populate('books.book');
    if(!cart){ res.render('cart'); return; }
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

const myOrder = async (req, res)=> {
    try {
        if(!req.cookies || !req.cookies.token) { res.render('sign-in-up'); return; }
        
        const userId = jwt.verify(req.cookies.token, 'ahsan4u')._id;
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

// const MyLikes = async (req, res)=> {
//     const userId = jwt.verify(req.cookies.token, 'ahsan4u')._id;
//     const likes = await Likes.findOne({ userId }).populate('books');
//     if(!likes) return res.render('likes');
//     const books = likes.books;
//     res.render('likes', {books});
// };

const MyAddress = (req, res)=> {
    if(!req.cookies || !req.cookies.token) { response.redirect('/sign-in-up'); }
    const bookId = req.params.bookId;
    const qty = req.params.qty;
    res.render('address', {bookId, qty});
}

const allOrder = async (req, res)=> {
    if(!req.cookies || !req.cookies.token) { res.render('sign-in-up'); return; }
    if(!jwt.verify(req.cookies.token, 'ahsan4u').admin) { res.send('you are not authorised'); return; }

    let checkOrders = await Address.find({}).populate('book');
    const allOrders = checkOrders.map((order)=> {
        const time = order.createdAt.toISOString();
        order.time = time.substring(0, 10)+' '+time.substring(11, 19);
        
        order.amount = Number(order.qty) * Number(order.book.price);
        return order;
    })
    res.render('all-orders', {allOrders});
}

module.exports = {signInUp,logout,myAccount,myCart,myOrder,allOrder,MyAddress}