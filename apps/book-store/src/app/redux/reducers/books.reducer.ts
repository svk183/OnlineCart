import { BooksAction, BooksActionTypes } from '../actions/books.actions';

export const initialState = [];

export function BooksListReducer( state = initialState, action: BooksAction ) {
    switch ( action.type ) {
        case BooksActionTypes.Change:
            return [...action.payload];
        default:
            return [...state];
    }
}