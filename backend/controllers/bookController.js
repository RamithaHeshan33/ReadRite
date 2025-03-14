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
        return res.status(200).json({books});
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
    const { bookName, authorName, supplierName, bookPrice, bookDescription } = req.body;
    let bookImage = req.file ? req.file.path : ''; // Fix: Get uploaded image path

    // Validate inputs before proceeding
    if (!bookName || !authorName || !supplierName || !bookPrice || !bookDescription) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (isNaN(bookPrice) || bookPrice <= 0) {
        return res.status(400).json({ message: 'Please enter a valid price' });
    }

    try {
        // Create book after validation
        let newBook = new bookModel({
            bookName,
            authorName,
            supplierName,
            bookPrice,
            bookImage, // Fix: Use the correct image variable
            bookDescription
        });

        await newBook.save();
        return res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addBook = [upload.single('bookImage'), addBook];


const updateBook = async (req, res) => {
    const { id } = req.params;
    const { bookName, authorName, supplierName, bookPrice, bookDescription } = req.body;
    
    try {
        // Find the existing book
        let book = await bookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // If a new image is uploaded, update the image path
        let bookImage = book.bookImage; // Keep existing image
        if (req.file) {
            bookImage = req.file.path; // Update with new image
        }

        // Update book details
        book = await bookModel.findByIdAndUpdate(
            id,
            { bookName, authorName, supplierName, bookPrice, bookDescription, bookImage },
            { new: true }
        );

        return res.status(200).json(book);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Export the function with `multer` middleware for image uploads
exports.updateBook = [upload.single('bookImage'), updateBook];




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

