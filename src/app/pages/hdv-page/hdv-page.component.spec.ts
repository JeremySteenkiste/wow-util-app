import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdvPageComponent } from './hdv-page.component';

describe('HdvPageComponent', () => {
  let component: HdvPageComponent;
  let fixture: ComponentFixture<HdvPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HdvPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HdvPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
