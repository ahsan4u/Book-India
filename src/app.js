const router = require('./router');
const connectDB = require('./db');
const path = require('path');
const hbs = require('hbs');
const PORT = process.env.PORT || 8000;
const express = require('express');
// const session = require('express-session');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const {Cart, Likes} = require('./modules');
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, `../templates/views`));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// app.use(session({
//     secret: 'CODE',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 1000 *60*60*24 }
// }));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next)=> {
    if(req.cookies && req.cookies.token)
        res.locals.user = jwt.verify(req.cookies.token, 'ahsan4u');
    next(); 
});

app.use(async (req, res, next)=> { 
    if(req.cookies && req.cookies.token) {
        const userId = jwt.verify(req.cookies.token, 'ahsan4u')._id;
        const cart = await Cart.findOne({ userId }).populate('books');
        
        if(cart) {
            res.locals.cart = cart.books;
            res.locals.cartCounts = cart.books.length;
        }
    }
    next();
});

app.use('/', router);

connectDB().then(()=> {
    app.listen(PORT, ()=> { console.log(`Server is live on port ${PORT}`) });
});
