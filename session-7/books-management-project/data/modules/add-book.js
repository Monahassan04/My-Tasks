const readBooks = require("./read.books");
const saveBooks = require("./save.books");

function addBook(title, author, price, available = true) {
    const books = readBooks();
    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        price,
        available
    };
    books.push(newBook);
    saveBooks(books);
    console.log(`Book added: "${title}" by ${author}`);
    return newBook;
}

module.exports = addBook;