const express = require("express");
const app = express();

app.use(express.json());

const books = [
  {
    id: 0,
    author: "Suzanne Collins",
    title: "The Hunger Games",
    borrows: [],
    returns: [],
  },
  {
    id: 1,
    author: "James Dashner",
    title: "The Maze Runner",
    borrows: [],
    returns: [],
  },
  {
    id: 2,
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    borrows: [],
    returns: [],
  },
];

app.get("/", (req, res) => {
  res.send("test bookstore API");
});

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
  res.send(book);
});

app.put("/api/books/return/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  book.returns.push(req.body.date)
});

app.put("/api/books/borrow/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  book.borrows.push(req.body.date)
});

app.delete("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  const index = books.indexOf(book)
  books.splice(index, 1)
  res.send(book)
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
