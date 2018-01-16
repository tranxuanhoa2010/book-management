import { Injectable } from '@angular/core';
import { Book } from './book';
// import { BOOKLIST } from './bookList';
import { Http, Response , Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class BookService {

  private apiUrl = 'http://localhost:53746/api/book';
  constructor(private _http: Http) { }

  // getBookList(): Book[] {
  //   return BOOKLIST;
  // }
  getBookList(): Observable<Book[]> {
 
    return this._http.get(this.apiUrl + "/GetList").map((response: Response) => response.json());
  }

  searchBook(keyword: string): Observable<Book[]> {
    console.log(this.apiUrl+"/?search="+ keyword);

    return this._http.get(this.apiUrl+"/?search="+ keyword).map((response: Response) => response.json());
  }

  getDetailBook(id): Observable<Book> {
    return this._http.get(this.apiUrl+"/GetBookById?id="+id).map((response: Response) => response.json());
  }

  // updateBook(data: any): Observable<any>{
  //   return this._http.put(this.apiUrl+"/SaveBook", data).map((response: Response) => response.json());
  // }

  // addBook(data: any): Observable<any>{
  //   console.log(data);
  //   return this._http.post(this.apiUrl+"/SaveBook", data).map((response: Response) => response.json());
  // }
  saveBook(data: any): Observable<any>{
    let headers = new Headers();
    headers.append("Content-Type", "application/json;charset=utf-8");
    return this._http.post(this.apiUrl+"/SaveBook", JSON.stringify(data),{headers: headers}).map((response: Response) => response.json());
  }


  deleteBook(id: number): Observable<any>{
    console.log(id);
    return this._http.get(this.apiUrl + "/DeleteBook?idBook="+ id).map((response: Response) => response.json());
  }
}
