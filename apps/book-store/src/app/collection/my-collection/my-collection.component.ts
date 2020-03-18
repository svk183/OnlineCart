// Angular Component Classes
import { Component, OnInit, OnDestroy } from '@angular/core';

// Redux related imports
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { selectAllCollectionItems } from '../../redux/reducers/mycollection.reducer';

// Dev Models
import { Book } from '../../models/book';

@Component({
  selector: 'online-cart-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit, OnDestroy {
  // variable to show all user collections
  public collectionBooks: Book[];

  // Varible to store subscription of collection data
  private collectionSub: Subscription;

  constructor(private store: Store<{CollectionState}>) { }

  ngOnInit() {
    // Fetching collection details from store
    this.collectionSub = this.store.select( selectAllCollectionItems ).subscribe( ( collectionData ) => {
      this.collectionBooks = collectionData;      
    });
  }

  getStoreRef(): Store<{CollectionState}> {
    return this.store;
  }

  ngOnDestroy() {
    // UnSubscribing all redux sub
    if( this.collectionSub ){
      this.collectionSub.unsubscribe();
    }
  }
}
