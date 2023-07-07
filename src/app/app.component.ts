import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currPage = 'home';

  home() {
    this.currPage = 'home';
  }

  books() {
    this.currPage = 'books';
  }
}


