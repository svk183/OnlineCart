import { Action } from '@ngrx/store';

import { Book } from '../../models/book';

export enum MyCollectionActionTypes {
    Add = '[Collection] Add',
    Remove = '[Collection] Remove',
    Update = '[Collection] Update'
}

export class MyCollectionAction implements Action {
    readonly type;
    newBook?: Book;
    id?: string;
}

export class AddToCollectionAction implements MyCollectionAction {
    readonly type = MyCollectionActionTypes.Add;

    constructor( public newBook: Book ) {}
}

export class UpdateCollectionAction implements MyCollectionAction {
    readonly type = MyCollectionActionTypes.Update;

    constructor( public id: string, public newBookDetails: Book ) {}
}

export class RemoveFromCollectionAction implements MyCollectionAction {
    readonly type = MyCollectionActionTypes.Remove;

    constructor( id: string ) {}
}