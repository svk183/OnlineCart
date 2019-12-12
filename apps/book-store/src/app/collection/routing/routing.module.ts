import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MyCollectionComponent } from './../my-collection/my-collection.component';

const routes: Routes = [
  {
    path: '',
    component: MyCollectionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class RoutingModule { }
