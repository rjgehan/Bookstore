const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

let books = [];
try {
  const dataFile = fs.readFileSync("dataBase.json");
  books = JSON.parse(dataFile);
} catch (err) {
}

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  res.send(book);
});

app.post("/api/books", (req, res) => {
  const book = {
    id: books.length,
    author: req.body.author,
    title: req.body.title,
    borrows: [],
    returns: [],
  };
  books.push(book);
  fs.writeFileSync("dataBase.json", JSON.stringify(books, null, 2));
  res.send(book);
});

app.put("/api/books/return/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  book.returns.push(req.body.date);

  const updatedData = books.map((b) => {
    if (b.id === book.id) {
      return book;
    }
    return b;
  });
  fs.writeFileSync("dataBase.json", JSON.stringify(updatedData, null, 2));

  res.send(book);
});

app.put("/api/books/borrow/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  book.borrows.push(req.body.date);

  const updatedData = books.map((b) => {
    if (b.id === book.id) {
      return book;
    }
    return b;
  });
  fs.writeFileSync("dataBase.json", JSON.stringify(updatedData, null, 2));

  res.send(book);
});


app.delete("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  const index = books.indexOf(book);
  books.splice(index, 1);

  const updatedData = books.filter((b) => b.id !== book.id);
  fs.writeFileSync("dataBase.json", JSON.stringify(updatedData, null, 2));

  res.send(book)
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
