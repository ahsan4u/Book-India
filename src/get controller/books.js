const { Books, Cart } = require('../modules');
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
        if(!req.session.user.admin) return res.send('you are unauthorized');
        res.render('add-book');
    } catch (error) {
        res.send(error);
    }
};

const eachBook = async (req, res)=> {
    const bookId = req.params.id;
    const book = await Books.findById(bookId);

    if(!book) res.redirect('/');
    
    const sameAuther = await Books.find({ auther: book.auther, _id: { $ne: bookId } }).limit(10);

    res.render('each-book', { book, sameAuther });
}

const textBooks = (req, res)=> {
    res.render('text-books');
}

const eBooks = async (req, res)=> {
    res.render('e-books');
}

const feathured = (req, res)=> {
    res.render('feathured');
}

const about = (req, res)=> {
    res.render('about');
}

module.exports = {
    home,
    allBooks,
    findBook,
    addBook,
    eachBook,
    textBooks,
    eBooks,
    feathured,
    about
};