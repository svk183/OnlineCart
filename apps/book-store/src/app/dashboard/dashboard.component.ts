//Angular Imports
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// NGRX / Redux Imports
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

// Redux( Actions / Reducers ) Imports
import { FetchBooks } from '../redux/actions/books.actions';

// Our Components, Services, Models
import { Book } from './../models/book';

@Component({
  selector: 'online-cart-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public booksList: Book[];
  public recentSearchs: string[];

  private booksListObs: Observable<Book[]>;
  private booksFetchObs: Observable<any>;

  constructor( private store: Store<{booksList: Book[], apiError: any}> ) {}

  ngOnInit() {
    this.booksListObs = this.store.pipe(select('booksList'));
    this.booksFetchObs = this.store.select('apiError');

    this.booksListObs.subscribe( ( newBooksList: Book[] ) => {
      this.booksList = newBooksList;
    });
    this.booksFetchObs.subscribe( ( errMessage ) => {
      // Show error popup to user
      if( errMessage != null ) {
        alert('Error in fetching books data');
      }
    });
  }

  searchBooks( form: NgForm ) {
    if( form.valid ){
      this.booksList = [];

      const fetchAction = new FetchBooks( form.value.searchField );
      this.store.dispatch( fetchAction );
    } else {
      alert("Please enter a valid search text");
    }
  }

}
