import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private fetchBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor( private http: HttpClient) { }

  getBooks( searchValue: any ){
    return this.http.get(`${this.fetchBooksURL}${searchValue}&key=${environment.googleAPIKey}`);
  }
}
