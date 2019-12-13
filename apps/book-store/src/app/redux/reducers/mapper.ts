import { ActionReducerMap } from '@ngrx/store';

import { BooksListReducer } from './books.reducer';
import { APIErrorReducer } from './apiError.reducer';
import { SearchReducer } from './search.reducer';
import { cartReducer } from './cart.reducer';
import { MyCollectionReducer } from './mycollection.reducer';
import { AddressReducer } from './address.reducer';

export const reducerMapper: ActionReducerMap<any> = {
    booksList: BooksListReducer,
    apiError: APIErrorReducer,
    searchList: SearchReducer,
    cartList: cartReducer,
    myCollection: MyCollectionReducer,
    addressList: AddressReducer
}