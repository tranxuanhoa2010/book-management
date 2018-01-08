import { Component, OnInit, style } from '@angular/core';
import { Book } from '../book';
import { BOOKLIST} from '../bookList';

import { BookService} from '../book.service';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [ BookService]
})
export class BookComponent implements OnInit {
  public bookList:any[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBookList().subscribe((response: any) => {
      this.bookList = response;
    }, error => {
      console.log(error)
    });
  }

  public headerStatus = false;
  public footerStatus = true;

  toggle(){
    this.headerStatus = !this.headerStatus;
    this.footerStatus = !this.footerStatus;
  }
  // bookList = BOOKLIST;
  // selectedBook: Book;

  // onSelect(book: Book): void {
  //   this.selectedBook = book;
  // }
}
