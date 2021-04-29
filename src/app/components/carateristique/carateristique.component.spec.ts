import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarateristiqueComponent } from './carateristique.component';

describe('CarateristiqueComponent', () => {
  let component: CarateristiqueComponent;
  let fixture: ComponentFixture<CarateristiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarateristiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarateristiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
