import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialsModule } from '../../angular-materials/angular-materials.module';
import { RoutingModule } from '../routing/routing.module';

import { MyCartComponent } from './my-cart.component';

import { getSampleBook } from '../../dashboard/dashboard.component.spec';

import { Book } from '../../models/book';

import { StoreModule } from '@ngrx/store';
import { reducerMapper } from '../../redux/reducers/mapper';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../redux/effects/books.effects';
import { AddBookToCartAction } from '../../redux/actions/cart.actions';

describe('AppComponent', () => {
  let fixture: ComponentFixture<MyCartComponent>;
  let comp: MyCartComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RoutingModule,
        FormsModule,
        HttpClientModule,
        AngularMaterialsModule,
        NoopAnimationsModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects])
      ],
      declarations: [
        MyCartComponent
      ]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(MyCartComponent);
      comp = fixture.debugElement.componentInstance;
    });
  }));

  test('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  test(`should show 'No Books added to cart block' - if no cart items`, ()=> {
    comp.cartDetails = [];

    fixture.detectChanges();

    expect( fixture.debugElement.query( By.css('.noCartItems') ) ).toBeTruthy();
  });

  test(`should not show 'No Books added to cart block' - if cart items exist`, ()=> {
    addSampleBookToCart( comp, fixture );
    
    expect( fixture.debugElement.query( By.css('.noCartItems') ) ).toBeFalsy();
  });

  test('should show cart items', ()=> {
    addSampleBookToCart( comp, fixture );

    expect( fixture.debugElement.query( By.css('.cartBlock') ) ).toBeTruthy();
  });

  test('should show cart total', ()=> {
    addSampleBookToCart( comp, fixture );

    expect( comp.cartValue ).toBe( comp.cartDetails[0].price );
  });

  test('should show address block if delivery details doesnt exist', ()=> {
    comp.payNow();

    expect( comp.expandAddressBlock ).toBe( true );
  });

  test('shouldnt show address block if delivery details exist', ()=> {
    makePayment( comp, fixture );
    
    expect( comp.expandAddressBlock ).toBe( false );
  });

  test(`should show 'No Books added to cart block' after payment`, ()=> {
    makePayment( comp, fixture );

    expect( fixture.debugElement.query( By.css('.noCartItems') ) ).toBeTruthy();
  });

  test(`shouldn't show cart details after payment`, ()=> {
    makePayment( comp, fixture );

    expect( fixture.debugElement.query( By.css('.cartBlock') ) ).toBeFalsy();
  });

  test('should remove book from cart', () => {
    const sampleBook = getSampleBook();
    const addToCartAction = new AddBookToCartAction( sampleBook );
    comp.getStoreObj().dispatch( addToCartAction );

    comp.removeBookFromCart( sampleBook.id );
    comp.ngOnInit();

    expect( comp.cartDetails.length ).toBe( 0 );
  });
});

function makePayment(comp, fixture) {
  addSampleBookToCart( comp, fixture );
  comp.name = "XXXX";
  comp.payNow();
  
  fixture.detectChanges();
}

function addSampleBookToCart( comp, fixture) {
  const sampleObj = getSampleCartObj();

  const cartAction = new AddBookToCartAction( sampleObj[0] );

  comp.getStoreObj().dispatch( cartAction );
  
  fixture.detectChanges();
}

export function getSampleCartObj(): Book[] {
  const sampleBook: Book = getSampleBook();
  sampleBook.deliveryAddress = {
    address: 'asdasd',
    id: 123,
    mobileNo: 990880,
    name: 'XXXX'
  };

  return [sampleBook];
}