import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { BooksService } from '../../services/books.service';
import { BooksActionTypes, FetchBooks } from '../actions/books.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Book } from '../../models/book';
import { of } from 'rxjs';
import { ErrorEnums, APIErrorAction } from '../actions/apiError.actions';

@Injectable()
export class BooksEffects {
    fetchBooks = createEffect( () =>
        this.actions.pipe(
            ofType(BooksActionTypes.Fetch),
            mergeMap( ( action: FetchBooks ) =>
                this.booksService.getBooks(action.payload).pipe(
                    map( ( res: any ) => {
                        if( res && res.items ) {
                            return res.items.map( ( obj: any ) => {
                                return {
                                            id: obj.id,
                                            authors: obj.volumeInfo.authors,
                                            currency: (obj.saleInfo.retailPrice && obj.saleInfo.retailPrice.currencyCode ) ? obj.saleInfo.retailPrice.currencyCode : '',
                                            price: (obj.saleInfo.retailPrice && obj.saleInfo.retailPrice.amount ) ? obj.saleInfo.retailPrice.amount : 0,
                                            imageLink: obj.volumeInfo.imageLinks && obj.volumeInfo.imageLinks.thumbnail ? obj.volumeInfo.imageLinks.thumbnail : '',
                                            publisher: obj.volumeInfo.publisher,
                                            title: obj.volumeInfo.title
                                        };
                            });
                        } else {
                            throw new Error( res );
                        }
                    }),
                    map( ( res: Book[] ) => {
                        return res.filter( item => {
                            return (item.imageLink !== '' && item.price !== 0 ) ? true : false
                        });
                    }),
                    map( response => ( {type: BooksActionTypes.Change, payload: response })),
                    catchError( ( errRes ) => {
                        const fetchError = new APIErrorAction( errRes );
                        return of(fetchError);
                    })
                )
            )
        )
    );

    constructor( private actions: Actions, private booksService: BooksService) {}
}