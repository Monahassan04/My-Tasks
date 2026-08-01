const http = require("http");
const fs = require("fs");
const path = require("path");

const BOOKS_FILE = path.join(__dirname, "books.json");

function readBooks() {
    try {
        return JSON.parse(fs.readFileSync(BOOKS_FILE, "utf-8"));
    } catch {
        return [];
    }
}

function writeBooks(books) {
    fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
}

function getBody(req) {
    return new Promise((resolve) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                resolve(null);
            }
        });
    });
}

const server = http.createServer(async (req, res) => {
    const url = req.url;
    const method = req.method;

    
    if (url === "/api/books" && method === "GET") {
        const books = readBooks();
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ status: "success", data: books }));
    }

    
    if (url === "/api/books" && method === "POST") {
        const body = await getBody(req);
        if (!body || !body.title || !body.author || body.price === undefined) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: "Missing title, author, or price" }));
        }

        const books = readBooks();
        const newBook = {
            id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
            title: body.title,
            author: body.author,
            price: body.price,
            available: body.available !== undefined ? body.available : true,
        };
        books.push(newBook);
        writeBooks(books);

        res.writeHead(201);
        return res.end(JSON.stringify({ status: "success", data: newBook }));
    }

    
    if (url.startsWith("/api/books/")) {
        const id = parseInt(url.split("/").pop());
        const books = readBooks();
        const index = books.findIndex((b) => b.id === id);

        if (index === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: "Book not found" }));
        }

       
        if (method === "GET") {
            res.writeHead(200);
            return res.end(JSON.stringify({ status: "success", data: books[index] }));
        }

        
        if (method === "PUT") {
            const body = await getBody(req);
            books[index] = { ...books[index], ...body };
            writeBooks(books);
            res.writeHead(200);
            return res.end(JSON.stringify({ status: "success", data: books[index] }));
        }

        if (method === "DELETE") {
            const deleted = books.splice(index, 1);
            writeBooks(books);
            res.writeHead(200);
            return res.end(JSON.stringify({ status: "success", message: "Deleted", data: deleted[0] }));
        }
    }

    
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`📚 Server running on http://localhost:${PORT}`);
});