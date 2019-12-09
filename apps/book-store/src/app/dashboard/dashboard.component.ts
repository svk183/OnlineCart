import { Book } from './../models/book';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'online-cart-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public booksList: Book[];
  public recentSearchs: string[];

  constructor( private booksAPIService: BooksService ) { }

  ngOnInit() {
    this.booksList = [];
  }

  searchBooks( form: NgForm ) {
    if( form.valid ){
      this.booksList = [];

      this.booksAPIService.getBooks( form.value.searchField )
      .subscribe( ( response : Book[] ) => {
        this.booksList = response
      }, ( err ) => {
        alert("Failed to fetch searched books");
      } );
    } else {
      alert("Please enter a valid search text");
    }
  }

}
