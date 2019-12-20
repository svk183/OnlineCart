// Angular Modules
import { Component, OnInit, OnDestroy } from '@angular/core';

// Angular Material popup Modles
import { MatSnackBar } from '@angular/material';

// Redux related imports
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { RemoveBookFromCartAction, RemoveAllBooksFromCartAction } from '../../redux/actions/cart.actions';
import { selectAllCartItems } from '../../redux/reducers/cart.reducer';
import { AddMultipleToCollectionAction } from '../../redux/actions/mycollection.actions';
import { UpdateAddressAction } from '../../redux/actions/address.actions';
import { selectAllCollectionItems } from '../../redux/reducers/mycollection.reducer';

// Dev Models and Enums
import { Book } from '../../models/book';
import { ReduceMappers } from '../../redux/reducers/mapper';
import { Address } from '../../models/address';

@Component({
  selector: 'online-cart-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit, OnDestroy {
  // Variables used in HTML
  public cartDetails: Book[];
  public expandAddressBlock: boolean;
  public name: string;
  public mobileNo: number;
  public address: string;
  public cartValue: number;

  // Varibles used in component only
  private clearCartDetails: boolean;
  private existingAddress: Address;

  // Subscriptions to fetch data from store
  private cartSub: Subscription;
  private collectionSub: Subscription;
  private addressSub: Subscription;

  constructor( private store: Store<{CartState, CollectionState, addressList: Address[]}>,
                private _snackBar: MatSnackBar) { }

  ngOnInit() {
    // Initialising varibles
    this.clearCartDetails = false;

    this.cartSub = this.store.select(selectAllCartItems).subscribe( ( cartData ) => {
      this.cartDetails = cartData;

      this.calculateCartValue();
    });
    this.collectionSub = this.store.select(selectAllCollectionItems).subscribe( () => {
      if( this.clearCartDetails === true ) {
        const cartAction = new RemoveAllBooksFromCartAction();

        this.store.dispatch( cartAction );

        this.clearCartDetails = false;
      }
    });
    this.addressSub = this.store.select(ReduceMappers.addressList).subscribe( ( addressDetails ) => {
      if( addressDetails && addressDetails.length ) {
        this.existingAddress = addressDetails[0];

        if( this.existingAddress && this.existingAddress.name ) {
          this.name = this.existingAddress.name;
          this.address = this.existingAddress.address;
          this.mobileNo = this.existingAddress.mobileNo;
        }
      }
    });

    this.expandAddressBlock = false;
  }

  // calculating sum of cart items price
  calculateCartValue() {
    this.cartValue = this.cartDetails.reduce( ( totalValue, cartObj ) => {
      return totalValue + cartObj.price;
    }, 0);
  }

  // Removes book from cart
  removeBookFromCart( bookId: string ) {
    const cartAction = new RemoveBookFromCartAction( bookId );

    this.store.dispatch( cartAction );
  }

  // Payment process - requesting address details, clearing cart and adding to collection
  payNow() {
    if( !this.name || this.name.length === 0 ) {
      this.expandAddressBlock = true;
    }else{
      this.expandAddressBlock = false;
      
      this._snackBar.open('Payment', 'Success', {
        duration: 3000,
      });

      this.clearCartDetails = true;

      if( !this.existingAddress ) {
        this.existingAddress = {
                                  name: '',
                                  id: null,
                                  address: '',
                                  mobileNo: null
                                };
      }

      this.existingAddress.id = this.existingAddress.id ? this.existingAddress.id : new Date().getTime();
      this.existingAddress.name = this.name;
      this.existingAddress.mobileNo = this.mobileNo;
      this.existingAddress.address = this.address;

      this.cartDetails = this.cartDetails.map( ( bookItem ) => {
        bookItem.deliveryAddress = Object.assign( {}, this.existingAddress );
        return bookItem;
      });
      
      const collectionAction = new AddMultipleToCollectionAction( this.cartDetails );

      this.store.dispatch( collectionAction );

      const updateAddressAction = new UpdateAddressAction( this.existingAddress );
      this.store.dispatch( updateAddressAction );
    }
  }

  getStoreObj() {
    return this.store;
  }

  ngOnDestroy() {
    // UnSubscribing all redux subscribers
    if( this.cartSub ) {
      this.cartSub.unsubscribe();
      this.collectionSub.unsubscribe();
      this.addressSub.unsubscribe();
    }
  }

}
