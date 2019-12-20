// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Angular Materials Module
import { AngularMaterialsModule } from './angular-materials/angular-materials.module';

// Redux related Modules, Reducers, Effects
import { reducerMapper } from './redux/reducers/mapper';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './redux/effects/books.effects';

// Dev Defined Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookDetailsComponent } from './book-details/book-details.component';

// Environment varibles
import { environment } from './../environments/environment.prod';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent, BookDetailsComponent],
  imports: [
            BrowserModule,
            CommonModule,
            HttpClientModule,
            RoutingModule, 
            FormsModule,
            ReactiveFormsModule,
            NoopAnimationsModule, 
            AngularMaterialsModule,
            StoreModule.forRoot(reducerMapper),
            EffectsModule.forRoot([BooksEffects]),
            environment.production ? StoreDevtoolsModule.instrument() : []
          ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
