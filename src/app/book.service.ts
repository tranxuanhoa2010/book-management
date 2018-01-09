import { Injectable } from '@angular/core';
import { Book } from './book';
import { BOOKLIST } from './bookList';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class BookService {

  private apiUrl = 'http://5a4ee6c11b90570012dbfa57.mockapi.io/angular/book';
  constructor(private _http: Http) { }

  // getBookList(): Book[] {
  //   return BOOKLIST;
  // }
  getBookList(): Observable<Book[]> {
    return this._http.get(this.apiUrl).map((response: Response) => response.json());
  }
  getDetailBook(id): Observable<Book> {
    return this._http.get(this.apiUrl+"/"+id).map((response: Response) => response.json());
  }

  updateBook(id:number,data: any): Observable<any>{
    return this._http.put(this.apiUrl+"/"+id, data).map((response: Response) => response.json());
  }

  addBook(data: any): Observable<any>{
    console.log(data);
    return this._http.post(this.apiUrl, data).map((response: Response) => response.json());
  }
}
