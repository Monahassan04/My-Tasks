const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/books.json");

function saveBooks(books) {
    fs.writeFileSync(dataPath, JSON.stringify(books, null, 2), "utf-8");
}

module.exports = saveBooks;