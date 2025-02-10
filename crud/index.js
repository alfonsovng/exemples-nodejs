const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const connectDb = require('./config/db.js');

const bookRoutes = require('./routes/bookRoutes')

//start mongoose
connectDb();

//express.json() middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up method-override middleware
app.use(methodOverride('_method'));

//pug middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//booksroute
app.use('/books', bookRoutes);

//base route
app.get('/', (req, res) => {
  res.redirect('/books');
});

//listen server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});