import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { BookService} from '../book.service';


import { Book } from '../book';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
  providers: [ BookService]
})
export class BookEditComponent implements OnInit, OnDestroy {
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
      this._id = params['id'];
      // alert(this._id);
    })
    this.bookService.getDetailBook( this._id).subscribe((response: any) => {
      this.book = response;
    }, error => {
      console.log(error)
    });
  }

  saveForm(){
    this.bookService.updateBook(this._id, this.book).subscribe(response => {
      if(response){
        alert('The book has been updated successful');
        this.router.navigate(['/bookList']);
      }
    });
  }
  goToBookList(){

  }
}
