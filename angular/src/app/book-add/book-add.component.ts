import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
    selector: 'app-book-add',
    templateUrl: './book-add.component.html',
    providers: [BookService]
})
export class BookAddComponent implements OnInit {
    // @Input() book: Book;
    public _id: number;
    public book: any;
    constructor(
        private bookService: BookService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location) {

    }
    ngOnInit() {
        this.book = {};
    }
    saveForm() {
        
        // console.log(this.book);

        this.bookService.saveBook(this.book).subscribe(response => {
            if (response) {
                // alert('The book has been add successful');
                this.router.navigate(['/bookList']);
            }
        });
    }
    goToBookList() {
        this.router.navigate(['/bookList']);
    }
    // onSubmit(value:any){
    //     console.log(value);
    //    }
}
