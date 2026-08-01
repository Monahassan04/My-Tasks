const readBooks = require("./read.books");
const saveBooks = require("./save.books");

function deleteBook(id) {
    const books = readBooks();
    const index = books.findIndex(b => b.id === id);
    
    if (index === -1) {
        console.log(`Book with ID ${id} not found`);
        return false;
    }
    
    const removed = books.splice(index, 1);
    saveBooks(books);
    console.log(`Book "${removed[0].title}" deleted successfully`);
    return true;
}

module.exports = deleteBook;