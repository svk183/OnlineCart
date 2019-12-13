import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { MyCollectionAction, MyCollectionActionTypes } from '../actions/mycollection.actions';

import { Book } from '../../models/book';
import { createFeatureSelector } from '@ngrx/store';

// Entity adapter
export const collectionAdapter = createEntityAdapter<Book>();
export interface CollectionState extends EntityState<Book> { }

export const initialState: CollectionState = collectionAdapter.getInitialState();

export function MyCollectionReducer( state = initialState, action: MyCollectionAction ) {
    switch( action.type ) {
        case MyCollectionActionTypes.Add:
            return collectionAdapter.addOne( action.newBook, state );
        case MyCollectionActionTypes.AddMultiple:
            return collectionAdapter.addMany( action.multipleBooks, state);
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

export const getCollectionState = createFeatureSelector<CollectionState>('myCollection');

// get the selectors
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = collectionAdapter.getSelectors( getCollectionState );
   
  // select the array of cart ids
  export const selectCollectionIds = selectIds;
   
  // select the dictionary of cart entities
  export const selectCollectionEntities = selectEntities;
   
  // select the array of cart items
  export const selectAllCollectionItems = selectAll;
   
  // select the total cart count
  export const selectCollectionTotal = selectTotal;