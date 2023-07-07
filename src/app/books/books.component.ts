import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent {
  storeName = 'The Rockport Bookstore';
  numBooks = 0;
  shelf1: Bookshelf;
  hideAdd: boolean = true;
  bookDisplay: boolean = false;
  errorMessage: string = '';
  defaultDesc: string = "This book's description is coming soon.";
  defaultCover: string = "../../assets/defaultImage.png";
  displayBook: Book = new Book(999, "placeHolder", "placeHolder", [], [], this.defaultCover, this.defaultDesc);

  constructor(private http: HttpClient) {
    this.shelf1 = new Bookshelf();

    this.http.get('/api/books').subscribe((data: any) => {
      for (var i = 0; i < data.length; i++) {
        this.shelf1.addBook(new Book(data[i].id, data[i].author, data[i].title, data[i].borrows, data[i].returns, data[i].cover, data[i].description));
        this.numBooks += 1;
      }
    });
  }

  newBook(title: string, author: string, titleBox: HTMLInputElement, authorBox: HTMLInputElement, description: string, descBox: HTMLTextAreaElement) {
    if (!title || !author) {
      this.errorMessage = 'error: Please provide both a title and an author.';
    } else {
      const bookData = {
        author: author,
        title: title
      };
      this.http.post('/api/books', bookData).subscribe((data: any) => { });
      this.numBooks += 1;
      this.shelf1.addBook(new Book(this.numBooks - 1, author, title, [], [], this.defaultCover, !description ? this.defaultDesc : description));


  
      this.hideAdd = !this.hideAdd;
      titleBox.value = '';
      authorBox.value = '';
      descBox.value = '';
    }
  }
  

  borrow(book: Book) {
    book.borrowBook()
    const bookData = {
      date: Date()
    };

    if (book.availability == true) {
      this.http.put('/api/books/borrow/' + book.id, bookData).subscribe((data: any) => {
      });
    } else {
      this.http.put('/api/books/return/' + book.id, bookData).subscribe((data: any) => {
      });
    }
  }

  toggleAdd() {
    this.hideAdd = !this.hideAdd;
  }

  bookClick(book: Book) {
    this.bookDisplay = !this.bookDisplay;
    this.displayBook = book;
  }
  delBook(book: Book) {
    this.shelf1.contents.splice(this.shelf1.contents.indexOf(book), 1);
    this.http.delete('/api/books/' + book.id).subscribe((data: any) => {
    });
    this.bookDisplay = !this.bookDisplay;
    this.numBooks -= 1;
  }

}


class Book {
  id: number;
  author: string;
  title: string;
  availability: boolean;
  borrows: Array<string>;
  returns: Array<string>;
  cover: string;
  description: string;

  constructor(id: number, author: string, title: string, borrows: Array<string>, returns: Array<string>, cover: string, description: string) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.availability = true;
    this.borrows = borrows;
    this.returns = returns;
    this.cover = cover;
    this.description = description;
  }

  borrowBook() {
    if (this.availability == true) {
      this.borrows.push(Date());
    } else {
      this.returns.push(Date());
    }

    this.availability = !this.availability;
  }
}

class Bookshelf {
  contents: Array<Book>;

  constructor() {
    this.contents = [];
  }

  addBook(newBook: Book): void {
    this.contents.push(newBook);
  }
}
