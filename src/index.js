const router = require('./router');
const connectDB = require('./db');
const path = require('path');
const hbs = require('hbs');
const PORT = 3000;
const express = require('express');
const session = require('express-session');
const {Cart, Likes} = require('./modules');
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, `../templates/views`));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(session({
    secret: 'CODE',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 *60*60*24 }
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next)=> { res.locals.user = req.session.user; next(); });
app.use(async (req, res, next)=> { 
    if(!req.session.user) {
    next();
    } else {
    const userId = req.session.user._id;
    if(!userId) {
        next();
    } else {
    const cart = await Cart.findOne({ userId }).populate('books');

    if(!cart) {
        next();
    } else {
        res.locals.cart = cart.books;
        res.locals.cartCounts = cart.books.length;
        next();
    }}}
});

app.use(async (req, res, next)=> {
    if(!req.session.user) {
        next();
        } else {
        const userId = req.session.user._id;
        if(!userId) {
            next();
        } else {
        const likes = await Likes.findOne({ userId }).populate('books');
    
        if(!likes) {
            next();
        } else {
            res.locals.likes = likes.books;
            res.locals.likeCounts = likes.books.length;
            next();
        }}}
})

app.use('/', router);

connectDB().then(()=> {
    app.listen(PORT, ()=> { console.log(`Server is live on port ${PORT}`) });
});