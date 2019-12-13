import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAllCollectionItems } from '../../redux/reducers/mycollection.reducer';

import { Book } from '../../models/book';

@Component({
  selector: 'online-cart-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent implements OnInit, OnDestroy {
  public collectionBooks: Book[];

  private collectionObs: Subscription;

  constructor(private store: Store<{CollectionState}>) { }

  ngOnInit() {
    this.collectionObs = this.store.select( selectAllCollectionItems ).subscribe( ( collectionData ) => {
      this.collectionBooks = collectionData;
    });
  }

  ngOnDestroy() {
    this.collectionObs.unsubscribe();
  }

}
