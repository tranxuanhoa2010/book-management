import { Component, OnInit, style } from '@angular/core';
import { Book } from '../book';
import { BOOKLIST } from '../bookList';

import { BookService } from '../book.service';
import { error } from 'selenium-webdriver';
// import to get params
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookService]
})
export class BookComponent implements OnInit {
  public bookList: any[];
  public pages: number[];
  public keyword: string;
  public currentPage: number;

  constructor(private bookService: BookService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    });

    this.loadData();

    this.pages = [1, 2, 3, 4, 5];
  }

  public headerStatus = false;
  public footerStatus = true;

  toggle() {
    this.headerStatus = !this.headerStatus;
    this.footerStatus = !this.footerStatus;
  }

  deleteBook(id:number){
      let confirmRes = confirm("Are you sure delete this book?");
      if(confirmRes){
        this.bookService.deleteBook(id).subscribe(response => {
          if(response){
            // alert('Deleted success!');
            this.loadData();
          }
        });
      }
  }

  loadData(){
    this.bookService.getBookList().subscribe((response: any) => {
      this.bookList = response;
    }, error => {
      console.log(error)
    });

  }

  searchBook(){
    this.bookService.searchBook(this.keyword).subscribe((response: any) => {
      this.bookList = response;
    }, error => {
      console.log(error)
    });
  }
  // bookList = BOOKLIST;
  // selectedBook: Book;

  // onSelect(book: Book): void {
  //   this.selectedBook = book;
  // }
}
