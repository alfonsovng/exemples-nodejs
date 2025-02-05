const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Book = require('../models/Book.js');

//get books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    //res.json(books);
    res.render('index', { books })
  } catch (err) {
    res.status(500).send('Error retreiving books')
  }
});

// Route to render the "Add Book" page with the form
router.get('/add', (req, res) => {
  res.render('addbook') // Render the addbook.pug template
});

//add book
router.post('/add', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      published_year: req.body.published_year
    });

    await newBook.save();
    //res.status(200).json('Book added successfully');
    res.redirect("/books");
  } catch (err) {
    res.status(500).send(`error is ${err.message}`);
  }
});

//Route to fetch the book and render the updatebook pug template
router.get('/update/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.render('updatebook', { book });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Cannot update books right now')
  }
});

//update books
router.post('/update/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    // Use object destructuring to extract properties from req.body
    const { title, author, genre, published_year } = req.body;

    // Update the book's properties
    book.title = title;
    book.author = author;
    book.genre = genre;
    book.published_year = published_year;

    //save the updated book
    await book.save();
    res.redirect("/books");
  } catch(err) {
    console.error(err.message);
    res.status(500).send("Cannot update books");
  }
});

//delete books
router.delete('/delete/:id', async (req, res) => {
  try {
    const book_id = req.params.id;
    await Book.deleteOne({_id: book_id});
    res.status(200).send("Book successfully removed");
  } catch(err) {
    console.error(err.message);
    res.status(500).send("Cannot delete book right now");
  }
});

module.exports = router;



