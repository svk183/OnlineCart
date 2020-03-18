// Angular Redux models
import { Action } from '@ngrx/store';

// Dev Models
import { Book } from '../../models/book';

export enum MyCollectionActionTypes {
    Add = '[Collection] Add',
    AddMultiple = '[Collection] AddMultiple',
    Remove = '[Collection] Remove',
    Update = '[Collection] Update'
}

export class MyCollectionAction implements Action {
    readonly type: string;
    newBook?: Book;
    multipleBooks?: Book[];
    id?: string;
}

export class AddToCollectionAction implements MyCollectionAction {
    readonly type = MyCollectionActionTypes.Add;

    constructor( public newBook: Book ) {}
}

export class AddMultipleToCollectionAction implements MyCollectionAction {
    readonly type = MyCollectionActionTypes.AddMultiple;

    constructor( public multipleBooks: Book[] ) {}
}

export class UpdateCollectionAction implements MyCollectionAction {
    readonly type = MyCollectionActionTypes.Update;

    constructor( public id: string, public newBookDetails: Book ) {}
}

export class RemoveFromCollectionAction implements MyCollectionAction {
    readonly type = MyCollectionActionTypes.Remove;

    constructor( id: string ) {}
}