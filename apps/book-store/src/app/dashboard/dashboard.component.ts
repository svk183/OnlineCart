//Angular Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// NGRX / Redux Imports
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

// Redux( Actions / Reducers ) Imports
import { FetchBooks } from '../redux/actions/books.actions';
import { AddToSearchListAction } from '../redux/actions/search.actions';
import { selectCartIds } from '../redux/reducers/cart.reducer';
import { selectCollectionIds } from '../redux/reducers/mycollection.reducer';
import { ReduceMappers } from '../redux/reducers/mapper';

// Dev Models and Enums
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
  public errorMessage: string;
  public cartItemIds: string[] | number[];
  public collectionIds: string[] | number[];
  public searchForm: FormGroup;

  // Observers for redux events
  private booksListSub: Subscription;
  private booksFetchSub: Subscription;
  private cartSub: Subscription;
  private searchListSub: Subscription;
  private collectionSub: Subscription;
  
  constructor( private store: Store<{ booksList: Book[],
                                      apiError: any, cartList: any,
                                      searchList: string[]
                                    }> ) {
    this.searchForm = new FormGroup({
      searchField: new FormControl('', [ Validators.required, Validators.pattern('[a-zA-Z0-9 ]*') ])
    });
  }
  
  ngOnInit() {
    this.errorMessage = '';

    // initialising redux data change listerners(Observers)
    this.booksListSub = this.store.pipe(select(ReduceMappers.booksList)).subscribe( ( newBooksList: Book[] ) => {
      this.booksList = newBooksList;
    });
    this.booksFetchSub = this.store.select(ReduceMappers.apiError).subscribe( ( errMessage ) => {
      // Show error popup to user
      if( errMessage != null ) {
        this.errorMessage = 'Error in fetching books data';
      }
    });
    this.cartSub = this.store.select(selectCartIds).subscribe( ( ids ) => {
      this.cartItemIds = ids;
    });
    this.searchListSub = this.store.select(ReduceMappers.searchList).subscribe( ( searchList ) => {
      this.recentSearchs = searchList;
    });
    this.collectionSub = this.store.select( selectCollectionIds ).subscribe( ( ids ) => {
      this.collectionIds = ids;
    });
  }

  // function used to get the books searched by user
  searchBooks() {      
    if( this.searchForm.valid && this.searchForm.value.searchField ){
      this.errorMessage = '';
      this.booksList = [];

      // calling search action to store all the search list
      const searchAction = new AddToSearchListAction( this.searchForm.value.searchField );
      this.store.dispatch( searchAction );

      // calling fetch Action which linked to effects
      const fetchAction = new FetchBooks( this.searchForm.value.searchField );
      this.store.dispatch( fetchAction );
    } else {
      this.errorMessage = "Please enter a valid search text";
    }
  }

  getStoreRef(): Store<{ booksList: Book[], apiError: any, cartList: any, searchList: string[]}> {
    return this.store;
  }

  ngOnDestroy() {
    // Unsubscribing all redux subscriptions
    if( this.booksListSub ) {
      this.booksListSub.unsubscribe();
      this.booksFetchSub.unsubscribe();
      this.searchListSub.unsubscribe();
      this.cartSub.unsubscribe();
      this.collectionSub.unsubscribe();
    }
  }

}
