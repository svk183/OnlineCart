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

import { DashboardComponent } from './dashboard.component';
import { BookDetailsComponent } from '../book-details/book-details.component';

describe('UI Blocks display', ()=> {
  let fixture;

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
      declarations: [DashboardComponent, BookDetailsComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(DashboardComponent);
    });
  }));
    
  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should not contain no books to show div block`, () => {
    expect( fixture.debugElement.query( By.css('.noBooks') ) ).toBe( null );
  });

  it('should not display any books initially', () => {
    expect( fixture.debugElement.query( By.css('.booksBlock') ) ).toBeFalsy();
  });

  it(`should show 'no books to show' in UI`, () => {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.recentSearchs = ['demo'];

    fixture.detectChanges();    

    expect( fixture.debugElement.query( By.css('.noBooks') ).nativeElement.textContent ).toBe('No books to show');
  });

  it(`should show books block`, async(() => {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    app.booksList = [ getSampleBook() ];

    fixture.detectChanges();
    
    expect( fixture.debugElement.query( By.css('.booksBlock') ) ).toBeTruthy();
  }));
});

describe('Search Form Tests', ()=> {
  let fixture: ComponentFixture<DashboardComponent>;
  let comp: DashboardComponent;
  let de: DebugElement;
  let el: HTMLElement;

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
      declarations: [DashboardComponent, BookDetailsComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(DashboardComponent);

      comp = fixture.componentInstance;
      de = fixture.debugElement.query( By.css('form') );
      el = fixture.nativeElement;
    });
  }));
    
  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  it('should call form submit function', async( ()=> {
    fixture.detectChanges();
    spyOn(comp, 'searchBooks');

    el = fixture.debugElement.query( By.css('.searchBtn') ).nativeElement;
    el.click();

    expect( comp.searchBooks ).toHaveBeenCalledTimes( 1 );
  }) );

  it('should throw error for empty search', () => {
    const inputEle = fixture.debugElement.query( By.css('.searchValue') ).nativeElement
    inputEle.value = '';
    inputEle.dispatchEvent(new Event('input') );

    fixture.detectChanges();

    expect( inputEle.value ).toEqual('');
    
    el = fixture.debugElement.query( By.css('.searchBtn') ).nativeElement;
    el.click();

    fixture.detectChanges();

    expect( comp.errorMessage ).toBe( 'Please enter a valid search text' );
  });

});

export function getSampleBook() {
  return {
            title: 'Example Book',
            id: 'asad',
            authors: ['authorX'],
            currency: 'ISD',
            description: 'Sample Description',
            imageLink: '"http://books.google.com/books/content?id=vDJjDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            price: 200,
            publisher: 'publisherX'
          };
}