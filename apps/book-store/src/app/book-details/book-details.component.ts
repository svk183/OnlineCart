// Angular Modules
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Redux Modules/Imports
import { Store } from '@ngrx/store';
import { AddBookToCartAction, RemoveBookFromCartAction } from '../redux/actions/cart.actions';

// Dev Models and Enums
import { Book } from '../models/book';
import { ReduceMappers } from '../redux/reducers/mapper';

// environment details
import { environment } from './../../environments/environment';

@Component({
  selector: 'online-cart-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  // Private varibles to implement functionality
  private books: Book[];
  private selectdBookId: string;
  private cartList: any;

  // Varibles used in HTML
  public bookDetails: Book;
  public itemBought: boolean;

  // redux Obbservables
  private booksListSub: any;
  private cartObjSub: any;

  // activate route to fetch params from URL, router to redirect to other URLs
  constructor( private store: Store<{ booksList: Book[], cartList: any  }>,
               private route: ActivatedRoute,
               private router: Router ) { }

  ngOnInit() {
    // Local fields initialization
    this.booksListSub = this.store.select(ReduceMappers.booksList).subscribe( ( booksList ) => {
      this.books = booksList;
    });;
    this.cartObjSub = this.store.select(ReduceMappers.cartList).subscribe( ( cartList ) => {
      this.cartList = cartList;    
    });
    
    this.itemBought = false;

    // Fetching Id from URL
    this.route.paramMap
    .subscribe( params => {
      this.selectdBookId = params.get( environment.urlParams["bookdetails#"] );

      // Fetching selected book details
      if( this.selectdBookId ) {
        this.books.forEach( ( bookData ) => {
          if( bookData.id === this.selectdBookId ){
            this.bookDetails = bookData;
          }
        });
      }

      // redirecting to home if bookslist missing in store
      if( !this.bookDetails ){
        this.router.navigate(['/']);
      }

      this.checkItemExistsInCart();
    });
  }

  // Checking if book already exists in cart or not
  checkItemExistsInCart(){
    if( this.selectdBookId ) {
      this.itemBought = this.cartList.ids.some( ( id ) => {
        return id === this.selectdBookId;
      }); 
    }
  }

  // Adding item to cart
  addBookToCart(){
    const cartAction = new AddBookToCartAction( this.bookDetails );

    this.store.dispatch( cartAction );

    this.checkItemExistsInCart();
  }

  // Adding book to cart and redirecting user to cart
  buyNow(){
    this.addBookToCart();

    this.router.navigate(['/cart']);
  }

  // removing item from cart
  removeBookFromCart(){
    const cartAction = new RemoveBookFromCartAction( this.selectdBookId );

    this.store.dispatch( cartAction );

    this.checkItemExistsInCart();
  }

  ngOnDestroy() {
    // Unsubscribing redux subscribers
    this.booksListSub.unsubscribe();
    this.cartObjSub.unsubscribe();
  }
}
