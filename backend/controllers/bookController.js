const bookModel = require('../models/bookModel');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const getAllBooks = async (req, res) => {
    let books;
    try {
        books = await bookModel.find();
        if (!books || books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }
        return res.status(200).json(books);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getAllBooks = getAllBooks;

const getBookByID = async (req, res) => {
    const { id } = req.params;
    let book;
    try {
        book = await bookModel.findById(id);
    }
    
    catch (err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
}

exports.getBookByID = getBookByID;

const addBook = async (req, res) => {
    const { bookName, authorName, supplierName, bookPrice, bookImage, bookDescription } = req.body;
    let image = req.file ? req.file.path : '';

    let newBook = new bookModel({
        bookName,
        authorName,
        supplierName,
        bookPrice,
        bookImage,
        bookDescription
    });

    if (!bookName || !authorName || !supplierName || !bookPrice || !bookImage || !bookDescription) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (isNaN(bookPrice)) {
        return res.status(400).json({ message: 'Please enter a valid price' });
    }

    if (bookPrice <= 0) {
        return res.status(400).json({ message: 'Please enter a valid price' });
    }

    try {
        await newBook.save();
        return res.status(201).json(newBook);
    }

    catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }

}

exports.addBook = [upload.single('bookImage'), addBook];

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { bookName, authorName, supplierName, bookPrice, bookDescription } = req.body;
    let book;

    try {
        book = await bookModel.findByIdAndUpdate(
            id,
            { bookName, authorName, supplierName, bookPrice, bookDescription },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBook = updateBook;



const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await bookModel.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteBook = deleteBook;

