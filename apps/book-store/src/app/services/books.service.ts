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

  getBooks( searchValue: string ){
    return this.http.get(`${this.fetchBooksURL}${searchValue}&key=${environment.googleAPIKey}`).pipe(
      map( ( res: any ) => {
        if( res && res.items ) {
          return res.items.map( ( obj: any ) => {
            return {
                      id: obj.id,
                      authors: obj.volumeInfo.authors,
                      currency: (obj.saleInfo.retailPrice && obj.saleInfo.retailPrice.currencyCode ) ? obj.saleInfo.retailPrice.currencyCode : '',
                      price: (obj.saleInfo.retailPrice && obj.saleInfo.retailPrice.amount ) ? obj.saleInfo.retailPrice.amount : 0,
                      imageLink: obj.volumeInfo.imageLinks && obj.volumeInfo.imageLinks.thumbnail ? obj.volumeInfo.imageLinks.thumbnail : '',
                      publisher: obj.volumeInfo.publisher,
                      title: obj.volumeInfo.title
                    };
          });
        } else {
          return [];
        }
      }),
      map( ( res: Book[] ) => {
        return res.filter( item => {
          return (item.imageLink !== '' && item.price !== 0 ) ? true : false
        });
      })
    );
  }
}
