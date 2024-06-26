jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const {Books} = require('../modules');
const fs = require('fs');

// Books Upload
const book = async (req, res)=> {
    try {
        await Books.create({
            name: req.body.name,
            price: req.body.price,
            categorie: req.body.categorie,
            qty: req.body.qty,
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

const bookImage = multer({ storage: multer.diskStorage({
    destination: (req, file, cb)=> { cb(null, path.join(__dirname, '../../public/books')) },
    filename: (req, file, cb)=> { cb(null, file.originalname) }
})});

// Delete a Book
const deleteBook = async (req, res) => {
    try {
        if(!jwt.verify(req.cookies.token, 'ahsan4u').admin) {
            res.send('you are not admin');
            return;
        }
        const bookId = req.params.bookId;
        const deletedBook = Books.findOneAndDelete({_id: bookId})
        .then(()=>{console.log('Image path succefully deleted from db');});
        
        console.log('book deleted');
        const imagePath = `/books${deletedBook.image}`;
        
        fs.unlink(imagePath, (error)=> {
            if(error) {console.log('error deleting image'+error); return;}
            console.log('image file is succefully deleted');
        });
        res.redirect('/');
        console.log('you reached here');
    } catch (error) {
     res.send('at deleting page '+error);  
    }
}

module.exports = {
    book, bookImage, deleteBook,
}