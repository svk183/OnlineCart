import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCollectionComponent } from './my-collection/my-collection.component';

import { RoutingModule } from './routing/routing.module';

@NgModule({
  declarations: [MyCollectionComponent],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class CollectionModule { }
