import { Action } from '@ngrx/store';

import { Book } from '../../models/book';

export enum CartActionTypes {
    Add = '[Cart Component] Add',
    AddMultiple = '[Cart Component] AddMultiple',
    Remove = '[Cart Component] Remove',
    Update = '[Cart Component] Update'
}

export class CartAction implements Action {
    readonly type;
    bookObj?: Book;
    booksObj?: Book[];
    id?: string;
}

export class AddBookToCartAction implements CartAction {
    readonly type = CartActionTypes.Add;
    
    constructor( public bookObj: Book ) {}
}

export class AddMultipleBooksToCartAction implements CartAction {
    readonly type = CartActionTypes.AddMultiple;

    constructor( public booksObj: Book[] ) {}
}

export class RemoveBookFromCartAction implements CartAction {
    readonly type = CartActionTypes.Remove;

    constructor( public id: string ) {}
}

export class UpdateBookInCartAction implements CartAction {
    readonly type = CartActionTypes.Update;

    constructor( public id: string, public bookObj: Book ) {}
}