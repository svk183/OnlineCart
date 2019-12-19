import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialsModule } from '../../angular-materials/angular-materials.module';
import { RoutingModule } from '../routing/routing.module';

import { MyCollectionComponent } from './my-collection.component';

import { StoreModule } from '@ngrx/store';
import { reducerMapper } from '../../redux/reducers/mapper';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../redux/effects/books.effects';

describe('AppComponent', () => {
  let fixture: ComponentFixture<MyCollectionComponent>;
  let app: MyCollectionComponent;

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
        MyCollectionComponent
      ]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(MyCollectionComponent);
      app = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});