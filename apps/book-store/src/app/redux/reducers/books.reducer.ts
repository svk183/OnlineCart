// Dev Defined Actions
import { BooksAction, BooksActionTypes } from '../actions/books.actions';

import { Book } from '../../models/book';

export const initialState = [];

export function BooksListReducer( state = initialState, action: BooksAction ): (string | Book)[] {
    switch ( action.type ) {
        case BooksActionTypes.Change:
            return [...action.payload];
        default:
            return [...state];
    }
}