import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Injectable()
export class CheckSaveFormGuard implements CanDeactivate<BookDetailComponent> {

    canDeactivate(component: BookDetailComponent){
        // alert('You cant leave this page without saving data');
        // return false;
        return true;
    }


}