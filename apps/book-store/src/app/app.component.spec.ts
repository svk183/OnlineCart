import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { RoutingModule } from './routing/routing.module';
import { FormsModule } from '@angular/forms';

import { AngularMaterialsModule } from './angular-materials/angular-materials.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { BookDetailsComponent } from './book-details/book-details.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RoutingModule,
        FormsModule,
        AngularMaterialsModule
      ],
      declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        BookDetailsComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'book-store'`, () => {
    expect(app.title).toEqual('book-store');
  });
});