import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectAllCartItems, CartState } from '../../redux/reducers/cart.reducer';

import { Book } from '../../models/book';

@Component({
  selector: 'online-cart-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit, OnDestroy {
  public cartDetails: Book[];

  private cartObs: any;

  constructor( private store: Store<CartState>) { }

  ngOnInit() {
    this.cartObs = this.store.select(selectAllCartItems).subscribe( ( cartData ) => {
      this.cartDetails = cartData;
    });
  }

  ngOnDestroy() {
    this.cartObs.unsubscribe();
  }

}
