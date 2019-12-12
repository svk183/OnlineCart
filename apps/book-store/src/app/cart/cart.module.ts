import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing/routing.module';

import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';

import { MyCartComponent } from './my-cart/my-cart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyCartComponent],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    AngularMaterialsModule
  ]
})
export class CartModule { }
