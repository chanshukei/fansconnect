import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderReviewComponent } from './myorder-review.component';

describe('MyorderReviewComponent', () => {
  let component: MyorderReviewComponent;
  let fixture: ComponentFixture<MyorderReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyorderReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
