const addBook = require("./modules/add.book");
const readBooks = require("./modules/read.books");
const updateBook = require("./modules/update.book");
const deleteBook = require("./modules/delete.book");

console.log("=== Book Management System ===\n");

addBook("Clean Code", "Robert C. Martin", 450);
addBook("JavaScript: The Good Parts", "Douglas Crockford", 300);
addBook("You Don't Know JS", "Kyle Simpson", 350);

console.log("\n All Books:");
console.log(readBooks());


updateBook(2, { price: 320, available: false });


deleteBook(3);


console.log("\n Final Books:");
console.log(readBooks());