const readBooks = require("./read.books");
const saveBooks = require("./save.books");

function updateBook(id, updates) {
    const books = readBooks();
    const index = books.findIndex(b => b.id === id);
    
    if (index === -1) {
        console.log(`❌ Book with ID ${id} not found`);
        return null;
    }
    
    books[index] = { ...books[index], ...updates };
    saveBooks(books);
    console.log(`Book ID ${id} updated successfully`);
    return books[index];
}

module.exports = updateBook;