import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCartComponent } from './my-cart/my-cart.component';
import { RoutingModule } from './routing/routing.module';

@NgModule({
  declarations: [MyCartComponent],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class CartModule { }
