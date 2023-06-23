import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent {
  storeName = 'The Rockport Bookstore';
  numBooks = 0;
  shelf1: Bookshelf;

  constructor() {
    this.shelf1 = new Bookshelf(new Book("Suzanne Collins", "The Hunger Games", [], []));
    this.numBooks += 1;
    this.addBooksToShelf();
  }

  addBooksToShelf() {
    this.shelf1.addBook(new Book("James Dashner", "The Maze Runner", [], []));
    this.numBooks += 1;

    this.shelf1.addBook(new Book("F. Scott Fitzgerald", "The Great Gatsby", [], []));
    this.numBooks += 1;

  }
  
  newBook() {
    this.shelf1.addBook(new Book("ryan", "test book", [], []))
    this.numBooks += 1;

  }

  borrow(book : Book) {
    book.borrowBook()
  }
}



class Book {
  author: string;
  title: string;
  availability: boolean;
  borrows: Array<string>[];
  returns: Array<string>[];
  //cover

  constructor(author : string, title : string, borrows : Array<string>[], returns : Array<string>[]) {
      this.author = author; 
      this.title = title;
      this.availability = true;
      this.borrows = borrows;
      this.returns = returns;
  }

  borrowBook() {
    this.availability = !this.availability;
  }
}

class Bookshelf {
  contents : Array<Book>;

  constructor(first : Book) {
    this.contents = [];
    this.contents.push(first)
  }

  addBook(newBook : Book) : void {
      this.contents.push(newBook)
  }

}