import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './../dashboard/dashboard.component';
import { BookDetailsComponent } from './../book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'bookdetails/:bookId',
    component: BookDetailsComponent
  },
  {
    path: 'cart',
    loadChildren: './../cart/cart.module#CartModule'
  },
  {
    path: 'mycollection',
    loadChildren: './../collection/collection.module#CollectionModule'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
