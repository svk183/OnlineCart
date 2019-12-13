import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCollectionComponent } from './my-collection/my-collection.component';

import { RoutingModule } from './routing/routing.module';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';

@NgModule({
  declarations: [MyCollectionComponent],
  imports: [
    CommonModule,
    RoutingModule,
    AngularMaterialsModule
  ]
})
export class CollectionModule { }
