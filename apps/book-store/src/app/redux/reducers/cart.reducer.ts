import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { CartAction, CartActionTypes } from '../actions/cart.actions';

import { Book } from '../../models/book';
import { createFeatureSelector } from '@ngrx/store';

// Entity adapter
export const cartAdapter = createEntityAdapter<Book>();
export interface CartState extends EntityState<Book> { }

const initialState: CartState = cartAdapter.getInitialState();

export function cartReducer( state = initialState, action: CartAction) {
    switch( action.type ) {
        case CartActionTypes.Add:
            return cartAdapter.addOne( action.bookObj, state );
        case CartActionTypes.AddMultiple:
            return cartAdapter.addMany( action.booksObj, state );
        case CartActionTypes.Update:
            return cartAdapter.updateOne({
                id: action.id,
                changes: action.bookObj
            }, state );
        case CartActionTypes.Remove:
            return cartAdapter.removeOne( action.id, state );
        default:
            return state;
    }
}

// Create the default selectors

export const getCartState = createFeatureSelector<CartState>('cart');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = cartAdapter.getSelectors(getCartState);