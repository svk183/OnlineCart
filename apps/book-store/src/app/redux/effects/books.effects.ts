// Angular Modules
import { Injectable } from '@angular/core';

// RXJS/NGRX Modules
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

// Dev Defined Services/Actions
import { BooksService } from '../../services/books.service';
import { BooksActionTypes, FetchBooks } from '../actions/books.actions';
import { APIErrorAction } from '../actions/apiError.actions';


@Injectable()
export class BooksEffects {
    // Creating an effect mapping to BooksActionTypes.Fetch
    fetchBooks = createEffect( () =>
        this.actions.pipe(
            ofType(BooksActionTypes.Fetch),
            switchMap( ( action: FetchBooks ) =>
                this.booksService.getBooks(action.payload).pipe(
                    // Calling Books Action
                    map( response => ( {type: BooksActionTypes.Change, payload: response })),
                    // Calling API response Action
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