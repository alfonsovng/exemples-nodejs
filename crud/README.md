# Simple CRUD Node.js App with MongoDB and Pug

This is a basic Node.js application that demonstrates CRUD (Create, Read, Update, Delete) operations. It uses MongoDB as the database and Mongoose ODM for data modeling and interaction. The app is built with the Express framework and renders HTML using Pug templates.

## Prerequisites

Before running the app, ensure you have the following installed:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com). MongoDB Atlas is also fine. This project uses MongoDB Atlas.

## Installation

Install dependencies:

    npm install 

Open `config/db.js` and add your MongoDB URI, local or Atlas.

## Usage

To start the server, run:

    npm start

Or:

    npm run dev

Visit `http://localhost:3000` or your hosted address in your browser to access the app.

## Functionality

The app allows you to:

- Create new books with a title, author, genre, and published year.
- Read the list of existing books.
- Update book information.
- Delete books from the collection.

## Technology Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Pug (formerly known as Jade)

## Folder Structure

- `index.js`: Entry point of the application.
- `views/`: Contains Pug templates for rendering HTML.
- `models/`: Defines the Mongoose data model for books.
- `routes/`: Contains Express route handlers.

## Credits

This project was created as part of a learning exercise and is maintained by [Adarsh S](https://github.com/adarsh-2425).

## License

[MIT License](LICENSE)
