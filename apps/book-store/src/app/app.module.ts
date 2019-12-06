import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing/routing.module';
import { MatMenuModule, MatIconModule, MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent],
  imports: [
            BrowserModule,
            RoutingModule, 
            NoopAnimationsModule, 
            MatMenuModule, 
            MatIconModule, 
            MatCardModule,
            FormsModule
          ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
