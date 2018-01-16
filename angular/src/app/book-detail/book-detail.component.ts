import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { BookService} from '../book.service';


import { Book } from '../book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  providers: [ BookService]
})
export class BookDetailComponent implements OnInit, OnDestroy {
  // @Input() book: Book;
  public _id : number;
  public subscription: any;
  public book: any;
  public cities = [{Id:1, Name:"Ha Noi"}, {Id:2, Name:"BMT"}, {Id:1, Name:"TP Ho Chi Minh"}];


  constructor(  
    private bookService: BookService,
    private router : Router,
    private route: ActivatedRoute,
    private location: Location) {
    
   }
   onSubmit(value:any){
    console.log(value);
   }
   ngOnDestroy(){
    this.subscription.unsubscribe();
   }
   ngOnInit(){
    // this.getBook();
    this.subscription = this.route.params.subscribe(params => {
      console.log(params);
      this._id = params['id'];
      alert(this._id);
    })
    this.bookService.getDetailBook( this._id).subscribe((response: any) => {
      this.book = response;
    }, error => {
      console.log(error)
    });
  }

  // GotoEmployee(){
  //   this.router.navigate(['bookList'])
  // }
  
  // getBook(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.bookService.getBook(id)
  //     .subscribe(book => this.book = book);
  // }
}
