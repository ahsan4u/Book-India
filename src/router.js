const bookGet = require('./get controller/books');
const bookPost = require('./post controller/books');
const {contactMsg, customerMsg} = require('./post controller/contacts');

const userGet = require('./get controller/users');
const userPost = require('./post controller/users');

const express = require('express');
const router = express.Router();

router.route('/').get(bookGet.home);
router.route('/books').get(bookGet.allBooks);
router.route('/find-book').get(bookGet.findBook);
router.route('/books/:id').get(bookGet.eachBook);
router.route('/text-books').get(bookGet.textBooks);
router.route('/feathured').get(bookGet.feathured);
router.route('/about').get(bookGet.about);
router.route('/contact').get(bookGet.contact);
router.route('/delete/:bookId').post(bookPost.deleteBook);

router.route('/contact-us').post(contactMsg);
router.route('/customers-massages').get(customerMsg);

router.route('/add-book').get(bookGet.addBook).post(bookPost.bookImage.single('image'), bookPost.book);
router.route('/post-user-photo').post(userPost.UserImg.single('image'), userPost.postUserPhoto);


router.route('/sign-in-up').get(userGet.signInUp);
router.route('/sign-up').post(userPost.register);
router.route('/sign-in').post(userPost.login);
router.route('/logout').get(userGet.logout);
router.route('/my-account').get(userGet.myAccount);
router.route('/my-cart').get(userGet.myCart);
router.route('/my-order').get(userGet.myOrder);
router.route('/all-orders').get(userGet.allOrder);
router.route('/all-orders/update/:orderId').post(userPost.updateAdminOrder);
// router.route('/likes').get(userGet.MyLikes);
router.route('/place-order/:bookId/:qty').get(userGet.MyAddress);
router.route('/place-order/:bookId/:qty').post(userPost.address);
router.route('/add-to-cart/:bookId/:qty').post(userPost.AddToCart);
router.route('/my-cart/remove/:bookId').post(userPost.removeItem);
router.route('/my-cart/minusQty/:bookId').post(userPost.minusQty);
router.route('/my-cart/plusQty/:bookId').post(userPost.plusQty);
// router.route('/add-to-likes/:bookId').post(userPost.addToLikes);
module.exports = router;
