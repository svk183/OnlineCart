import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { MyCollectionAction, MyCollectionActionTypes } from '../actions/mycollection.actions';

import { Book } from '../../models/book';

// Entity adapter
export const collectionAdapter = createEntityAdapter<Book>();
export interface CollectionState extends EntityState<Book> { }

export const initialState: CollectionState = collectionAdapter.getInitialState();

export function MyCollectionReducer( state = initialState, action: MyCollectionAction ) {
    switch( action.type ) {
        case MyCollectionActionTypes.Add:
            return collectionAdapter.addOne( action.newBook, state );
        case MyCollectionActionTypes.Update:
            return collectionAdapter.updateOne({
                id: action.id,
                changes: action.newBook
            }, state);
        case MyCollectionActionTypes.Remove:
            return collectionAdapter.removeOne( action.id, state );
        default:
            return state;
    }
}