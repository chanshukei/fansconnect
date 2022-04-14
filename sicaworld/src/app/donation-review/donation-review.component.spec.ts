import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationReviewComponent } from './donation-review.component';

describe('DonationReviewComponent', () => {
  let component: DonationReviewComponent;
  let fixture: ComponentFixture<DonationReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
