//Angular Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

// NGRX / Redux Imports
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

// Redux( Actions / Reducers ) Imports
import { FetchBooks } from '../redux/actions/books.actions';
import { AddToSearchListAction } from '../redux/actions/search.actions';

// Our Components, Services, Models
import { Book } from './../models/book';

@Component({
  selector: 'online-cart-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Fields used in component UI
  public booksList: Book[];
  public recentSearchs: string[];

  // Observers for redux events
  private booksListObs: Subscription;
  private booksFetchObs: Subscription;
  private cartObs: Subscription;
  private searchListObs: Subscription;

  constructor( private store: Store<{booksList: Book[], apiError: any, cartList: any, searchList: string[]}> ) {}

  ngOnInit() {
    // initialising redux data change listerners(Observers)
    this.booksListObs = this.store.pipe(select('booksList')).subscribe( ( newBooksList: Book[] ) => {
      this.booksList = newBooksList;
    });;
    this.booksFetchObs = this.store.select('apiError').subscribe( ( errMessage ) => {
      // Show error popup to user
      if( errMessage != null ) {
        alert('Error in fetching books data');
      }
    });
    this.cartObs = this.store.select('cartList').subscribe( data => {
      // console.log( data );
    });
    this.searchListObs = this.store.select('searchList').subscribe( ( searchList ) => {
      this.recentSearchs = searchList;
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

  ngOnDestroy() {
    this.booksListObs.unsubscribe();
    this.booksFetchObs.unsubscribe();
    this.searchListObs.unsubscribe();
    this.cartObs.unsubscribe();
  }

}
