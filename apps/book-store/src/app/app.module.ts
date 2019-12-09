import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing/routing.module';
import { MatMenuModule, MatIconModule, MatCardModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksService } from './services/books.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent],
  imports: [
            BrowserModule,
            RoutingModule, 
            NoopAnimationsModule, 
            MatMenuModule, 
            MatIconModule, 
            MatCardModule,
            FormsModule,
            HttpClientModule
          ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule {}
