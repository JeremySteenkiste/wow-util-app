import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimisationPageComponent } from './optimisation-page.component';

describe('OptimisationPageComponent', () => {
  let component: OptimisationPageComponent;
  let fixture: ComponentFixture<OptimisationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptimisationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimisationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
