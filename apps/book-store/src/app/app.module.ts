// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Angular Materials Module
import { AngularMaterialsModule } from './angular-materials/angular-materials.module';

// Redux related Modules, Reducers, Effects
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BooksListReducer } from './redux/reducers/books.reducer';
import { APIErrorReducer } from './redux/reducers/apiError.reducer';
import { BooksEffects } from './redux/effects/books.effects';

// Dev Defined Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Environment varibles
import { environment } from './../environments/environment.prod';
import { SearchReducer } from './redux/reducers/search.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent],
  imports: [
          BrowserModule,
            HttpClientModule,
            RoutingModule, 
            FormsModule,
            NoopAnimationsModule, 
            AngularMaterialsModule,
            StoreModule.forRoot({ 
                                  booksList: BooksListReducer,
                                  apiError: APIErrorReducer,
                                  searchList: SearchReducer
                                }),
            EffectsModule.forRoot([BooksEffects]),
            environment.production ? StoreDevtoolsModule.instrument() : []
          ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
