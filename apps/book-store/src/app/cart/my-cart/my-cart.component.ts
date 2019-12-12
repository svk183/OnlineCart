import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { Store } from '@ngrx/store';
import { RemoveBookFromCartAction } from '../../redux/actions/cart.actions';
import { selectAllCartItems, CartState } from '../../redux/reducers/cart.reducer';

import { Book } from '../../models/book';

@Component({
  selector: 'online-cart-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit, OnDestroy {
  public cartDetails: Book[];
  public name: string;
  public mobileNo: number;
  public address: string;
  private cartObs: any;
  public expandAddressBlock: boolean;

  constructor( private store: Store<CartState>, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cartObs = this.store.select(selectAllCartItems).subscribe( ( cartData ) => {
      this.cartDetails = cartData;
    });
    this.expandAddressBlock = false;
    this.name = '';
    this.address = '';
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

      
    }
      
  }

  ngOnDestroy() {
    this.cartObs.unsubscribe();
  }

}
