import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './../routing/routing.module';

import { By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../redux/effects/books.effects';
import { reducerMapper } from '../redux/reducers/mapper';

import { BookDetailsComponent } from './book-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { getSampleBook } from '../dashboard/dashboard.component.spec';

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
    
  test('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  test('should not contain bookDetail block initially', ()=>{
    expect( fixture.debugElement.query( By.css('.example-card') ) ).toBeFalsy();
  });

  test('should show book details', ()=>{
    comp.bookDetails = getSampleBook();

    comp.setSelectedBookId( comp.bookDetails.id );

    fixture.detectChanges();

    expect( fixture.debugElement.query( By.css('.example-card') ).nativeElement ).toBeTruthy();
  });
});