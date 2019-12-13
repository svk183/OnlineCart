// Angular Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components used in routing
import { DashboardComponent } from './../dashboard/dashboard.component';
import { BookDetailsComponent } from './../book-details/book-details.component';

// environment varibles 
import { environment } from './../../environments/environment';

// Apps main routes mapping
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: `bookdetails/:${environment.urlParams["bookdetails#"]}`,
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
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
