const multer = require('multer');
const path = require('path');
const Books = require('../modules');

// Books Upload
    const book = async (req, res)=> {
    try {
        await Books.create({
            name: req.body.name,
            price: req.body.price,
            categorie: req.body.categorie,
            image: req.file.originalname,
            description: req.body.description,
            auther: req.body.auther,
            publisher: req.body.publisher,
            publishedDate: req.body.publishedDate,
            isbn: req.body.isbn,
            binding: req.body.binding,
            language: req.body.language,
            pages: req.body.pages,
            width: req.body.width,
            height: req.body.height,
        });
        console.log(`A new Book created in books Collections`);
        res.redirect('/add-book');
    } catch (error) { res.send(`On Posting Book ${error}`); }
}
const bookStorage = multer.diskStorage({
    destination: path.join(__dirname, '../public/books'),
    filename: (req, file, cb)=> { cb(null, file.originalname) }
});
const bookImage = multer({ storage: bookStorage }).single('image');



module.exports = {
    book, bookImage,
}