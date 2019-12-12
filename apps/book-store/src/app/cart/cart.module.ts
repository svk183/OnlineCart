import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing/routing.module';

import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';

import { MyCartComponent } from './my-cart/my-cart.component';

@NgModule({
  declarations: [MyCartComponent],
  imports: [
    CommonModule,
    RoutingModule,
    AngularMaterialsModule
  ]
})
export class CartModule { }
