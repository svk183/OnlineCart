import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialsModule } from '../../angular-materials/angular-materials.module';
import { RoutingModule } from '../routing/routing.module';

import { MyCollectionComponent } from './my-collection.component';

import { StoreModule } from '@ngrx/store';
import { reducerMapper } from '../../redux/reducers/mapper';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../redux/effects/books.effects';
import { getSampleCartObj } from '../../cart/my-cart/my-cart.component.spec';
import { AddToCollectionAction } from '../../redux/actions/mycollection.actions';

describe('AppComponent', () => {
  let fixture: ComponentFixture<MyCollectionComponent>;
  let comp: MyCollectionComponent;

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
        MyCollectionComponent
      ]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(MyCollectionComponent);
      comp = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  it(`should show 'No Books Added to Collection!' initially`, () => {
    comp.collectionBooks = [];

    fixture.detectChanges();

    expect( fixture.debugElement.query( By.css('.noCollectionItems') ) ).toBeTruthy();
  });

  it(`should show collection Block`, () => {
    const collectionAction = new AddToCollectionAction( getSampleCartObj()[0] );
    comp.getStoreRef().dispatch( collectionAction );

    fixture.detectChanges();

    expect( fixture.debugElement.query( By.css('.collectionItemsBlock') ) ).toBeTruthy();
  });
});

