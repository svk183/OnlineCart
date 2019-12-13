// Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';

// current modules Routing Module
import { RoutingModule } from './routing/routing.module';

// Components used in this module
import { MyCollectionComponent } from './my-collection/my-collection.component';

@NgModule({
  declarations: [MyCollectionComponent],
  imports: [
    CommonModule,
    RoutingModule,
    AngularMaterialsModule
  ]
})
export class CollectionModule { }
