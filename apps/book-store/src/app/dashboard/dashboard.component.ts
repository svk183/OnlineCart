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
import { AddToSearchListAction } from '../redux/actions/search.actions';

@Component({
  selector: 'online-cart-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Fields used in component UI
  public booksList: Book[];
  public recentSearchs: string[];

  // Observers for redux events
  private booksListObs: Observable<Book[]>;
  private booksFetchObs: Observable<any>;

  constructor( private store: Store<{booksList: Book[], apiError: any}> ) {}

  ngOnInit() {
    // initialising redux data change listerners(Observers)
    this.booksListObs = this.store.pipe(select('booksList'));
    this.booksFetchObs = this.store.select('apiError');
    
    // Subscribers for redux data changes
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

  // function used to get the books searched by user
  searchBooks( form: NgForm ) {
    if( form.valid ){
      this.booksList = [];

      // calling search action to store all the search list
      const searchAction = new AddToSearchListAction( form.value.searchField );
      this.store.dispatch( searchAction );

      // calling fetch Action which linked to effects
      const fetchAction = new FetchBooks( form.value.searchField );
      this.store.dispatch( fetchAction );
    } else {
      alert("Please enter a valid search text");
    }
  }

}
