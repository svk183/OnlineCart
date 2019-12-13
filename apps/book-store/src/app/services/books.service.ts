// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// environment varibles map
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // URL to fetch books details
  private fetchBooksURL = environment.urlLinks.googleBooksFetch.replace("##", environment.googleAPIKey);

  constructor( private http: HttpClient) { }

  // Function to fetch books details from googleBooks
  getBooks( searchValue: any ){
    return this.http.get( this.fetchBooksURL.replace("#", searchValue) );
  }
}
