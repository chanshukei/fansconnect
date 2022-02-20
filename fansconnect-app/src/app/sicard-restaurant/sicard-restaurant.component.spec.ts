import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicardRestaurantComponent } from './sicard-restaurant.component';

describe('SicardRestaurantComponent', () => {
  let component: SicardRestaurantComponent;
  let fixture: ComponentFixture<SicardRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicardRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SicardRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
