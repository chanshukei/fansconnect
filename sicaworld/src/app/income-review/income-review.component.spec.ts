import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeReviewComponent } from './income-review.component';

describe('IncomeReviewComponent', () => {
  let component: IncomeReviewComponent;
  let fixture: ComponentFixture<IncomeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
