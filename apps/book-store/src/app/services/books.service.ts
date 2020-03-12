// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// environment varibles map
import { environment } from './../../environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // URL to fetch books details
  private fetchBooksURL = environment.urlLinks.localhostBooksFetch;

  constructor( private http: HttpClient) { }

  // Function to fetch books details from googleBooks
  getBooks( searchValue: any ){
    return this.http.get<Book[]>( this.fetchBooksURL.replace("#", searchValue) );
  }
}
