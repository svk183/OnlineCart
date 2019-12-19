import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './../routing/routing.module';

import { By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';

import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../redux/effects/books.effects';
import { reducerMapper } from '../redux/reducers/mapper';

import { BookDetailsComponent } from './book-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

describe('Book Details Component', ()=> {
  let fixture: ComponentFixture<BookDetailsComponent>;
  let comp: BookDetailsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        RoutingModule,
        AngularMaterialsModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects])
      ],
      declarations: [BookDetailsComponent, DashboardComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(BookDetailsComponent);

      comp = fixture.componentInstance;
    });
  }));
    
  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });
});