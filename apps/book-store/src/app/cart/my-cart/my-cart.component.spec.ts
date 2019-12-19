import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialsModule } from '../../angular-materials/angular-materials.module';
import { RoutingModule } from '../routing/routing.module';

import { MyCartComponent } from './my-cart.component';

import { StoreModule } from '@ngrx/store';
import { reducerMapper } from '../../redux/reducers/mapper';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../redux/effects/books.effects';

describe('AppComponent', () => {
  let fixture: ComponentFixture<MyCartComponent>;
  let app: MyCartComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
  RoutingModule,
        FormsModule,
        HttpClientModule,
        AngularMaterialsModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects])
      ],
      declarations: [
        MyCartComponent
      ]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(MyCartComponent);
      app = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});