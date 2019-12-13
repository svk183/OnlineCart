import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { RemoveBookFromCartAction, RemoveAllBooksFromCartAction } from '../../redux/actions/cart.actions';
import { selectAllCartItems } from '../../redux/reducers/cart.reducer';
import { AddMultipleToCollectionAction } from '../../redux/actions/mycollection.actions';
import { Address, UpdateAddressAction } from '../../redux/actions/address.actions';
import { selectAllCollectionItems } from '../../redux/reducers/mycollection.reducer';

import { Book } from '../../models/book';

@Component({
  selector: 'online-cart-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit, OnDestroy {
  public cartDetails: Book[];
  public expandAddressBlock: boolean;
  private clearCartDetails: boolean;
  private existingAddress: Address;
  public name: string;
  public mobileNo: number;
  public address: string;

  private cartObs: Subscription;
  private collectionObs: Subscription;
  private addressObs: Subscription;

  constructor( private store: Store<{CartState, CollectionState, addressList: Address[]}>,
                private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clearCartDetails = false;

    this.cartObs = this.store.select(selectAllCartItems).subscribe( ( cartData ) => {
      this.cartDetails = cartData;
    });
    this.collectionObs = this.store.select(selectAllCollectionItems).subscribe( () => {
      if( this.clearCartDetails === true ) {
        const cartAction = new RemoveAllBooksFromCartAction();

        this.store.dispatch( cartAction );

        this.clearCartDetails = false;
      }
    });
    this.addressObs = this.store.select('addressList').subscribe( ( addressDetails ) => {
      console.log( addressDetails );
      
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

  removeBookFromCart( bookId: string ) {
    const cartAction = new RemoveBookFromCartAction( bookId );

    this.store.dispatch( cartAction );
  }

  payNow() {
    
    if( !this.name || this.name.length === 0 ) {
      this.expandAddressBlock = true;
    }else{
      this.expandAddressBlock = false;
      
      this._snackBar.open('Payment', 'Success', {
        duration: 3000,
      });

      this.clearCartDetails = true;

      const collectionAction = new AddMultipleToCollectionAction( this.cartDetails );

      this.store.dispatch( collectionAction );

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

      const updateAddressAction = new UpdateAddressAction( this.existingAddress );
      this.store.dispatch( updateAddressAction );
    }
  }

  ngOnDestroy() {
    this.cartObs.unsubscribe();
    this.collectionObs.unsubscribe();
    this.addressObs.unsubscribe();
  }

}
