const bookGet = require('./get controller/books');
const bookPost = require('./post controller/books');

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

router.route('/add-book').get(bookGet.addBook).post(bookPost.bookImage, bookPost.book);


router.route('/sign-in-up').get(userGet.signInUp)
router.route('/sign-up').post(userPost.UserImg.single('image'), userPost.register);
router.route('/sign-in').post(userPost.login);
router.route('/logout').get(userGet.logout);
router.route('/my-account').get(userGet.myAccount);
router.route('/my-cart').get(userGet.myCart);
router.route('/likes').get(userGet.MyLikes);
router.route('/add-to-cart/:bookId').post(userPost.AddToCart);
router.route('/add-to-likes/:bookId').post(userPost.addToLikes);
module.exports = router;
