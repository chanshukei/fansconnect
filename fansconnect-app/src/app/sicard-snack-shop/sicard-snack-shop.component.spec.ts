import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicardSnackShopComponent } from './sicard-snack-shop.component';

describe('SicardSnackShopComponent', () => {
  let component: SicardSnackShopComponent;
  let fixture: ComponentFixture<SicardSnackShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicardSnackShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SicardSnackShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
