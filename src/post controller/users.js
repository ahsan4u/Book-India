const multer = require('multer');
const path = require('path');
const { Users, Cart, Likes, Books, Address } = require('../modules');

// User Registration
const register = async (req, res) => {
    try {
        if(req.body.password != req.body.cpassword) return res.render('sign-in-up', { msg: 'password not match' });
        const body = req.body;
        await Users.create({
            fullname: body.fullname,
            mobile: body.mobile,
            email: body.email,
            password: body.password,
            cart: [],
        });
        res.render('sign-in-up', { msg: `Hi Mr. ${req.body.firstname} ${req.body.lastname} your account is created successfully!`});
    } catch (error) {
        console.log(`on Sign up page ${error}`);
    }
};  

const postUserPhoto = async (req, res)=> {
    try {
        userId = req.session.user._id;
        let image = null;
        if(req.file.originalname) image = req.file.originalname;
        await Users.findOneAndUpdate({_id: userId},{image});
        req.session.user.userImgUploaded = true;
        req.session.user.image = req.file.originalname;
        res.redirect('/my-account');
    } catch (error) {
        console.log(`on uploading user image ${error}`);
    }
}
const UserImg = multer({storage: multer.diskStorage({
    destination: (req, file, cb)=>{ cb(null, path.join(__dirname, '../../public/Users')) },
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
        const qty = Number(req.params.qty);
        await Cart.findOneAndUpdate( {userId}, { $addToSet: {books: {book: bookId, qty} } }, { upsert: true, new: true } );
        res.redirect(`/books/${bookId}`);
    } catch (error) {
        console.log(`On add to cart page ${error}`);
    }
};

const minusQty = async (req, res)=> {
    try {
        const userId = req.session.user._id;
        const bookId = req.params.bookId;
        
        await Cart.updateOne({userId, "books.book": bookId}, {$inc: {"books.$.qty": -1}});
        res.redirect('/my-cart');   
    } catch (error) {
        res.send('on decreasing qty ', error);
    }
}

const plusQty = async (req, res)=> {
    try {
        const userId = req.session.user._id;
        const bookId = req.params.bookId;
        const theCart = await Cart.updateOne({userId, "books.book": bookId}, {$inc: {"books.$.qty": 1}});
        res.redirect('/my-cart');   
    } catch (error) {
        res.send('on increasing qty ', error);
    }
}

const removeItem = async (req, res)=> {
    try {
        const bookId = req.params.bookId;
        const userId = req.session.user._id;
        const cart = await Cart.findOne({userId});
        const index = cart.books.indexOf(bookId);
        cart.books.splice(index, 1);
        await cart.save();
        res.redirect('/');
    } catch (error) {
        res.send('in removing book '+error);
    }


}

const addToLikes = async (req, res)=> {
    const bookId = req.params.bookId;
    const userId = req.session.user._id;
    await Likes.findOneAndUpdate({userId}, { $addToSet: {books: bookId} }, {upsert: true, new: true });
    res.redirect(`/books/${bookId}`);
};

const address = async (req, res)=> {
    try {
        const bookId = req.params.bookId;
        const userId = req.session.user._id;
        const userAddress = {
            fullname: req.body.fullname, 
            mobile: req.body.mobile,
            mobileAlt: req.body.mobileAlt,
            houseOrBuildingName: req.body.houseOrBuildingName,
            roadName: req.body.roadName,
            landmark: req.body.landmark,
            pincode: req.body.pincode,
            district: req.body.district,
            state: req.body.state,
        }
        if(req.params.bookId == 'null') {
            const cartItems = await Cart.findOne({userId}).populate('books.book');
            cartItems.books.forEach(async (item)=> {
                await Books.findByIdAndUpdate(item.book._id, {$inc: {qty: -item.qty}});
                await Address.create({
                    userId: userId,
                    book: item.book._id,
                    qty: item.qty,
                    userAddress: userAddress,
                });
            });
            res.send('<h1>Order has been placed successfully</h1>');
            return;
        }
        const buyQty = req.params.qty;
        Books.findByIdAndUpdate(bookId, {$inc: {qty: -buyQty}});
        Address.create({
            userId: userId,
            book: bookId,
            qty: buyQty,
            userAddress: userAddress,
        });
        res.redirect(`/`);
    } catch (error) {
        res.send('At Placing order '+error);
    }
}

// update Admin Orders
const updateAdminOrder = async (req, res)=> {
    try {
        const orderId = req.params.orderId;
        console.log('backend before finding address');
        const order = await Address.findByIdAndUpdate(orderId, {status: true}, {new: true});
        console.log('backend after finding adsress');
        console.log(order);
        res.redirect('/all-orders');
    } catch (error) {
        res.send('at updating status', error);
    }

}

module.exports = { 
    register,
    login,
    AddToCart,
    minusQty,
    plusQty,
    removeItem,
    addToLikes,
    address,
    updateAdminOrder,
    postUserPhoto,
    UserImg
}