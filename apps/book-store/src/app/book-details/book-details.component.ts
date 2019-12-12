// Angular Modules
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Redux Modules/Imports
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddBookToCartAction, RemoveBookFromCartAction } from '../redux/actions/cart.actions';

// Dev Modles
import { Book } from '../models/book';

@Component({
  selector: 'online-cart-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  // fields to book details and cart status
  public bookDetails: Book;
  private books: Book[];
  private selectdBookId: string;
  private cartList: any;
  public itemBought: boolean;

  // redux Obbservables
  private booksListObs: any;
  private cartObjObs: any;

  constructor( private store: Store<{booksList: Book[], cartList: any}>,
               private route: ActivatedRoute,
               private router: Router ) { }

  ngOnInit() {
    // Local fields initialization
    this.booksListObs = this.store.select('booksList').subscribe( ( booksList ) => {
      this.books = booksList;
    });;
    this.cartObjObs = this.store.select('cartList').subscribe( ( cartList ) => {
      this.cartList = cartList;    
    });
    
    this.itemBought = false;

    // Fetching Id from URL
    this.route.paramMap
    .subscribe( params => {
      this.selectdBookId = params.get('bookId');

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

  checkItemExistsInCart(){
    if( this.selectdBookId ) {
      this.itemBought = this.cartList.ids.some( ( id ) => {
        return id === this.selectdBookId;
      }); 
    }
  }

  // Adding item to cart
  AddBookToCart(){
    const cartAction = new AddBookToCartAction( this.bookDetails );

    this.store.dispatch( cartAction );

    this.checkItemExistsInCart();
  }

  // removing item from cart
  removeBookFromCart(){
    const cartAction = new RemoveBookFromCartAction( this.selectdBookId );

    this.store.dispatch( cartAction );

    this.checkItemExistsInCart();
  }

  ngOnDestroy() {
    this.booksListObs.unsubscribe();
    this.cartObjObs.unsubscribe();
  }
}
