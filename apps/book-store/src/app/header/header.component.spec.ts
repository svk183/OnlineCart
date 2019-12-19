import { TestBed, async } from "@angular/core/testing";

import { AngularMaterialsModule } from "../angular-materials/angular-materials.module";

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialsModule
      ],
      declarations: [
        HeaderComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});