const { Books, Cart } = require('../modules');
const jwt = require('jsonwebtoken');
const home = async (req, res)=> {
    try {
        const topDeal = await Books.find({ categorie: 'topDeal' }).limit(8);
        const bestSeller = await Books.find({ categorie: 'bestSeller' }).limit(8);
        const newArrival = await Books.find({ categorie: 'newArrival' }).limit(8);
        const awardWinner = await Books.find({ categorie: 'awardWinner' }).limit(8);
        const nonFiction = await Books.find({ categorie: 'nonFiction' }).limit(8);
        
        res.render('index', { topDeal, bestSeller, newArrival, awardWinner, nonFiction });
    } catch (error) {
        console.log(`At home page ${error}`);
    }
};
 
const allBooks = async (req, res)=> {
    try {
        const books = await Books.find({});
              
        res.render('all-books', { books });
    } catch (error) {
        console.log(`On Finding All Book ${error}`);
    }
};

const findBook = async (req, res)=> {
    try {
        const name = req.query.name;
        const regName = new RegExp(name, 'i');
        const books = await Books.find({ name: { $regex: regName } });

        res.render('all-books', { books, name });
    } catch (error) {
        console.log(`On Finding Book ${error}`);
    }
}

const addBook = async (req, res)=> {
    try {
        if(!req.cookies || !req.cookies.token) { res.render('sign-in-up'); return; }
        if(!jwt.verify(req.cookies.token, 'ahsan4u').admin) { res.send('you are not authorised'); return; }
        
        res.render('add-book');
    } catch (error) {
        res.send(error);
    }
};

const eachBook = async (req, res)=> {
    const bookId = req.params.id;
    const book = await Books.findById(bookId);

    if(!book) return res.redirect('/');
    
    book.priceBefore = (Number(book.price) + (20/100 * Number(book.price))).toFixed(0);

    const sameAuther = await Books.find({ auther: book.auther, _id: { $ne: bookId } }).limit(10);

    res.render('product-details', { book, sameAuther });
}

const textBooks = (req, res)=> {
    res.render('text-books');
}

const feathured = (req, res)=> {
    res.render('feathured');
}

const about = (req, res)=> {
    res.render('about');
}

const contact = (req, res) => {
    res.render('contact');
}

module.exports = {
    home,
    allBooks,
    findBook,
    addBook,
    eachBook,
    textBooks,
    feathured,
    about,
    contact,
};
