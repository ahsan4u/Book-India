const multer = require('multer');
const path = require('path');
const { Users, Cart, Likes } = require('../modules');

// User Registration
const register = async (req, res) => {
    try {
        if(req.body.password != req.body.cpassword) return res.render('sign-in-up', { msg: 'password not match' });
        let image = null;
        if(req.file.originalname) image = req.file.originalname;
        await Users.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            image: image,
            cart: [],
        });
        res.render('sign-in-up', { msg: `Hi Mr. ${req.body.firstname} ${req.body.lastname} your account is created successfully!`});
    } catch (error) {
        console.log(`on Sign up page ${error}`);
    }
};  
const UserImg = multer({storage: multer.diskStorage({
    destination: path.join(__dirname, '../../public/Users'),
    filename: (req, file, cb)=> { cb(null, file.originalname) }
}) });


// User Login
const login = async (req, res)=> {
    try {
        if(!req.body.username) return res.render('sign-in-up', { msg: 'Please input your mob. no. or email address' });
        if(!req.body.password) return res.render('sign-in-up', { msg: 'Please input your password' });

        const user = await Users.findOne({ $or: [{ email: req.body.username }, { mobile: req.body.username }] });

        if(!user) return res.render('sign-in-up', { msg: 'email/mob. no. is incorrect' });
        if(req.body.password == user.password) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.render('sign-in-up', { msg: 'Incorrect Password' });
        }

    } catch (error) {
        console.log(`On Registration ${error}`);
    }
}

const AddToCart = async (req, res)=> {
    try {
        const bookId = req.params.bookId;
        const userId = req.session.user._id;
        await Cart.findOneAndUpdate( {userId}, { $addToSet: {books: bookId} }, { upsert: true, new: true } );
        res.redirect(`/books/${bookId}`);
    } catch (error) {
        console.log(`On add to cart page ${error}`);
    }
};

const addToLikes = async (req, res)=> {
    const bookId = req.params.bookId;
    const userId = req.session.user._id;
    await Likes.findOneAndUpdate({userId}, { $addToSet: {books: bookId} }, {upsert: true, new: true });
    res.redirect(`/books/${bookId}`);
};

module.exports = { 
    register, UserImg,
    login, AddToCart,
    addToLikes
}